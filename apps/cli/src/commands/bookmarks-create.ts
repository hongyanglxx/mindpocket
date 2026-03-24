import { CliError } from "../lib/errors.js"
import { ok } from "../lib/result.js"
import { validateSessionOrClear } from "./shared.js"

export async function bookmarksCreateCommand(options: {
  url?: string
  title?: string
  folderId?: string
}) {
  if (!options.url) {
    throw new CliError("VALIDATION_ERROR", "The --url option is required.")
  }

  const { client } = await validateSessionOrClear()
  const data = await client.request<unknown>("/api/ingest", {
    method: "POST",
    body: JSON.stringify({
      url: options.url,
      title: options.title,
      folderId: options.folderId,
      clientSource: "cli",
    }),
  })

  return ok(data)
}
