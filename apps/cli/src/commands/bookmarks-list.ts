import { ok } from "../lib/result.js"
import { validateSessionOrClear } from "./shared.js"

export async function bookmarksListCommand(options: Record<string, string | undefined>) {
  const { state, client } = await validateSessionOrClear()
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(options)) {
    if (value) {
      query.set(key, value)
    }
  }

  const suffix = query.size > 0 ? `?${query.toString()}` : ""
  const data = await client.request<{
    bookmarks: unknown[]
    total: number
    hasMore: boolean
  }>(`/api/bookmarks${suffix}`)

  return ok({
    serverUrl: state.serverUrl,
    ...data,
  })
}
