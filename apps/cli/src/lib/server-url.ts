import { readConfig } from "./config.js"
import { CliError } from "./errors.js"

export const DEFAULT_SERVER_URL = "http://127.0.0.1:3000"
const TRAILING_SLASHES_REGEX = /\/+$/

function normalizeServerUrl(value: string) {
  return value.replace(TRAILING_SLASHES_REGEX, "")
}

export async function resolveServerUrl(explicit?: string) {
  if (explicit) {
    return normalizeServerUrl(explicit)
  }

  if (process.env.MINDPOCKET_SERVER_URL) {
    return normalizeServerUrl(process.env.MINDPOCKET_SERVER_URL)
  }

  const config = await readConfig()
  if (config.serverUrl) {
    return normalizeServerUrl(config.serverUrl)
  }

  return DEFAULT_SERVER_URL
}

export function assertServerUrl(value: string) {
  try {
    const url = new URL(value)
    if (!url.protocol.startsWith("http")) {
      throw new Error("invalid protocol")
    }
    return value.replace(TRAILING_SLASHES_REGEX, "")
  } catch {
    throw new CliError("VALIDATION_ERROR", "Server URL must be a valid http(s) URL")
  }
}
