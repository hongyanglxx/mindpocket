import { ok } from "../lib/result.js"
import { validateSessionOrClear } from "./shared.js"

export async function bookmarksGetCommand(id: string) {
  const { client } = await validateSessionOrClear()
  const data = await client.request<unknown>(`/api/bookmarks/${encodeURIComponent(id)}`)
  return ok(data)
}
