import { ApiClient } from "../lib/api-client.js"
import { clearSession, getStoredState } from "../lib/auth-store.js"
import { ok } from "../lib/result.js"

export async function authStatusCommand() {
  const state = await getStoredState()
  if (!(state.serverUrl && state.session?.accessToken)) {
    return ok({
      authenticated: false,
      serverUrl: state.serverUrl || null,
      user: null,
    })
  }

  try {
    const sessionPayload = await new ApiClient(state.serverUrl, state.session.accessToken).request<{
      session: { expiresAt: string } | null
      user: { id: string; email: string; name: string } | null
    }>("/api/auth/get-session")

    if (!(sessionPayload.user && sessionPayload.session)) {
      await clearSession()
      return ok({
        authenticated: false,
        serverUrl: state.serverUrl,
        user: null,
      })
    }

    return ok({
      authenticated: true,
      serverUrl: state.serverUrl,
      user: sessionPayload.user,
      expiresAt: sessionPayload.session.expiresAt,
    })
  } catch {
    return ok({
      authenticated: false,
      serverUrl: state.serverUrl,
      user: null,
    })
  }
}
