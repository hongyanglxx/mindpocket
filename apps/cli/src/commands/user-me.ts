import { ok } from "../lib/result.js"
import { validateSessionOrClear } from "./shared.js"

export async function userMeCommand() {
  const { session } = await validateSessionOrClear()
  return ok({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    avatar: session.user.image || "",
  })
}
