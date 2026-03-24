import { clearSession } from "../lib/auth-store.js"
import { ok } from "../lib/result.js"

export async function authLogoutCommand() {
  await clearSession()
  return ok({ loggedOut: true })
}
