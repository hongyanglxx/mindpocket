import { setServerUrl } from "../lib/auth-store.js"
import { ok } from "../lib/result.js"
import { assertServerUrl } from "../lib/server-url.js"

export async function configSetServerCommand(serverUrl: string) {
  const normalized = assertServerUrl(serverUrl)
  await setServerUrl(normalized)
  return ok({ serverUrl: normalized })
}
