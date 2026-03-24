import { ok } from "../lib/result.js"
import { validateSessionOrClear } from "./shared.js"

export async function foldersListCommand() {
  const { client } = await validateSessionOrClear()
  const data = await client.request<unknown>("/api/folders")
  return ok(data)
}
