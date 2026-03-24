import { ApiClient } from "../lib/api-client.js"
import { storeSession } from "../lib/auth-store.js"
import { CliError } from "../lib/errors.js"
import { openBrowser } from "../lib/open-browser.js"
import { ok, printStderr } from "../lib/result.js"
import { resolveServerUrl } from "../lib/server-url.js"

const CLIENT_ID = "mindpocket-cli"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function authLoginCommand(options: { server?: string }) {
  const serverUrl = await resolveServerUrl(options.server)
  const client = new ApiClient(serverUrl)
  const deviceCodeResponse = await client.request<{
    device_code: string
    user_code: string
    verification_uri: string
    verification_uri_complete: string
    expires_in: number
    interval: number
  }>("/api/auth/device/code", {
    method: "POST",
    body: JSON.stringify({ client_id: CLIENT_ID }),
  })

  printStderr(`Verification URL: ${deviceCodeResponse.verification_uri}`)
  printStderr(`Verification URL (complete): ${deviceCodeResponse.verification_uri_complete}`)
  printStderr(`User code: ${deviceCodeResponse.user_code}`)
  printStderr(`Expires in: ${deviceCodeResponse.expires_in}s`)
  printStderr(`Poll interval: ${deviceCodeResponse.interval}s`)

  const opened = await openBrowser(deviceCodeResponse.verification_uri_complete)
  if (!opened) {
    printStderr("Browser open failed. Open the verification URL manually.")
  }

  const startedAt = Date.now()
  const timeoutAt = startedAt + deviceCodeResponse.expires_in * 1000
  let intervalMs = deviceCodeResponse.interval * 1000

  while (Date.now() < timeoutAt) {
    await sleep(intervalMs)

    const response = await fetch(`${serverUrl}/api/auth/device/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        device_code: deviceCodeResponse.device_code,
        client_id: CLIENT_ID,
      }),
    })

    if (response.ok) {
      const tokenPayload = (await response.json()) as {
        access_token: string
        expires_in: number
      }

      const sessionPayload = await new ApiClient(serverUrl, tokenPayload.access_token).request<{
        session: { expiresAt: string }
        user: { id: string; email: string; name: string }
      }>("/api/auth/get-session")

      if (!sessionPayload.user) {
        throw new CliError("API_ERROR", "Device flow completed but session lookup failed.")
      }

      const obtainedAt = new Date().toISOString()
      const expiresAt =
        sessionPayload.session?.expiresAt ||
        new Date(Date.now() + tokenPayload.expires_in * 1000).toISOString()

      await storeSession(
        {
          accessToken: tokenPayload.access_token,
          obtainedAt,
          expiresAt,
          user: {
            id: sessionPayload.user.id,
            email: sessionPayload.user.email,
            name: sessionPayload.user.name,
          },
        },
        serverUrl
      )

      return ok({
        serverUrl,
        user: sessionPayload.user,
        expiresAt,
      })
    }

    const errorPayload = (await response.json()) as {
      error?: string
      error_description?: string
    }

    if (errorPayload.error === "authorization_pending") {
      continue
    }

    if (errorPayload.error === "slow_down") {
      intervalMs += 5000
      continue
    }

    if (errorPayload.error === "access_denied") {
      throw new CliError(
        "AUTH_DENIED",
        errorPayload.error_description || "Device authorization denied.",
        errorPayload,
        2
      )
    }

    if (errorPayload.error === "expired_token") {
      throw new CliError(
        "AUTH_TIMEOUT",
        errorPayload.error_description || "Device authorization expired.",
        errorPayload,
        2
      )
    }

    throw new CliError(
      "API_ERROR",
      errorPayload.error_description || "Device authorization failed.",
      errorPayload
    )
  }

  throw new CliError("AUTH_TIMEOUT", "Timed out waiting for device authorization.", undefined, 2)
}
