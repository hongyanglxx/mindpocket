import type { CommandHelpMeta } from "../lib/types.js"

function renderSection(title: string, lines: string[]) {
  const body = lines.length > 0 ? lines.map((line) => `  ${line}`).join("\n") : "  None."
  return `${title}:\n${body}`
}

export function renderCommandHelp(meta: CommandHelpMeta) {
  return [
    renderSection("Summary", [meta.summary]),
    renderSection("Usage", meta.usage),
    renderSection(
      "Arguments",
      meta.arguments.length > 0
        ? meta.arguments.map((argument) => `${argument.name}  ${argument.description}`)
        : ["None."]
    ),
    renderSection(
      "Options",
      meta.options.map((option) => `${option.flags}  ${option.description}`)
    ),
    renderSection("Auth", [`Requires login: ${meta.authRequired ? "yes" : "no"}`]),
    renderSection("Output", meta.output),
    renderSection("Examples", meta.examples),
    renderSection("Errors", meta.errors),
  ].join("\n\n")
}

export function renderRootHelp() {
  return [
    "Summary:\n  MindPocket CLI is a JSON-first command line client for agents and scripts.",
    [
      "Quick start:",
      "  mindpocket config set server https://your-domain.com",
      "  mindpocket auth login",
      "  mindpocket user me",
      "  mindpocket bookmarks list",
    ].join("\n"),
    [
      "Commands:",
      "  auth login",
      "  auth logout",
      "  auth status",
      "  config get",
      "  config set server <url>",
      "  user me",
      "  bookmarks list",
      "  bookmarks get <id>",
      "  bookmarks create --url <url> [--title <title>] [--folder-id <id>]",
      "  folders list",
    ].join("\n"),
    [
      "Agent tips:",
      "  stdout uses JSON for normal command results.",
      "  stderr carries login instructions and diagnostics.",
      "  Run subcommands with --help to inspect auth requirements, parameters, output fields, and examples.",
      "  Configure server and complete auth login before protected commands.",
    ].join("\n"),
    [
      "Examples:",
      "  mindpocket auth status",
      "  mindpocket bookmarks create --url https://example.com --title Example",
    ].join("\n"),
  ].join("\n\n")
}
