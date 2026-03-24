import { authLoginCommand } from "./commands/auth-login.js"
import { authLogoutCommand } from "./commands/auth-logout.js"
import { authStatusCommand } from "./commands/auth-status.js"
import { bookmarksCreateCommand } from "./commands/bookmarks-create.js"
import { bookmarksGetCommand } from "./commands/bookmarks-get.js"
import { bookmarksListCommand } from "./commands/bookmarks-list.js"
import { configGetCommand } from "./commands/config-get.js"
import { configSetServerCommand } from "./commands/config-set-server.js"
import { foldersListCommand } from "./commands/folders-list.js"
import { userMeCommand } from "./commands/user-me.js"
import { HELP_BY_COMMAND } from "./help/command-help.js"
import { renderCommandHelp, renderRootHelp } from "./help/render-help.js"
import { CliError, toCliError } from "./lib/errors.js"
import { fail, printJson } from "./lib/result.js"

function hasHelp(args: string[]) {
  return args.includes("--help") || args.includes("-h")
}

function parseFlags(args: string[]) {
  const values: Record<string, string | undefined> = {}

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index]
    if (!current.startsWith("--")) {
      continue
    }

    const key = current.slice(2)
    const next = args[index + 1]
    if (!next || next.startsWith("--")) {
      values[key] = "true"
      continue
    }

    values[key] = next
    index += 1
  }

  return values
}

function helpFor(command: string) {
  const meta = HELP_BY_COMMAND[command]
  if (!meta) {
    throw new CliError("VALIDATION_ERROR", `Unknown command help target: ${command}`)
  }

  process.stdout.write(`${renderCommandHelp(meta)}\n`)
}

function printRootHelp() {
  process.stdout.write(`${renderRootHelp()}\n`)
}

async function runAuth(args: string[]) {
  if (args[0] !== "auth") {
    return null
  }

  const subcommand = args[1]
  const subcommandArgs = args.slice(2)

  if (subcommand === "login") {
    if (hasHelp(subcommandArgs)) {
      helpFor("auth login")
      return 0
    }

    printJson(await authLoginCommand({ server: parseFlags(subcommandArgs).server }))
    return 0
  }

  if (subcommand === "logout") {
    if (hasHelp(subcommandArgs)) {
      helpFor("auth logout")
      return 0
    }

    printJson(await authLogoutCommand())
    return 0
  }

  if (subcommand === "status") {
    if (hasHelp(subcommandArgs)) {
      helpFor("auth status")
      return 0
    }

    printJson(await authStatusCommand())
    return 0
  }

  if (args.length === 1 || hasHelp(args.slice(1))) {
    helpFor("auth")
    return 0
  }

  return null
}

async function runConfig(args: string[]) {
  if (args[0] !== "config") {
    return null
  }

  const subcommand = args[1]

  if (subcommand === "get") {
    if (hasHelp(args.slice(2))) {
      helpFor("config get")
      return 0
    }

    printJson(await configGetCommand())
    return 0
  }

  if (subcommand === "set" && args[2] === "server") {
    if (hasHelp(args.slice(3))) {
      helpFor("config set server")
      return 0
    }

    const serverUrl = args[3]
    if (!serverUrl) {
      throw new CliError("VALIDATION_ERROR", "Missing <url> argument for `config set server`.")
    }

    printJson(await configSetServerCommand(serverUrl))
    return 0
  }

  if (args.length === 1 || hasHelp(args.slice(1))) {
    helpFor("config")
    return 0
  }

  return null
}

async function runUser(args: string[]) {
  if (args[0] !== "user") {
    return null
  }

  if (args[1] === "me") {
    if (hasHelp(args.slice(2))) {
      helpFor("user me")
      return 0
    }

    printJson(await userMeCommand())
    return 0
  }

  if (args.length === 1 || hasHelp(args.slice(1))) {
    helpFor("user")
    return 0
  }

  return null
}

async function runBookmarks(args: string[]) {
  if (args[0] !== "bookmarks") {
    return null
  }

  const subcommand = args[1]
  const subcommandArgs = args.slice(2)

  if (subcommand === "list") {
    if (hasHelp(subcommandArgs)) {
      helpFor("bookmarks list")
      return 0
    }

    const flags = parseFlags(subcommandArgs)
    printJson(
      await bookmarksListCommand({
        limit: flags.limit,
        offset: flags.offset,
        search: flags.search,
        folderId: flags["folder-id"],
        type: flags.type,
        platform: flags.platform,
      })
    )
    return 0
  }

  if (subcommand === "get") {
    if (hasHelp(subcommandArgs)) {
      helpFor("bookmarks get")
      return 0
    }

    const id = args[2]
    if (!id) {
      throw new CliError("VALIDATION_ERROR", "Missing <id> argument for `bookmarks get`.")
    }

    printJson(await bookmarksGetCommand(id))
    return 0
  }

  if (subcommand === "create") {
    if (hasHelp(subcommandArgs)) {
      helpFor("bookmarks create")
      return 0
    }

    const flags = parseFlags(subcommandArgs)
    printJson(
      await bookmarksCreateCommand({
        url: flags.url,
        title: flags.title,
        folderId: flags["folder-id"],
      })
    )
    return 0
  }

  if (args.length === 1 || hasHelp(args.slice(1))) {
    helpFor("bookmarks")
    return 0
  }

  return null
}

async function runFolders(args: string[]) {
  if (args[0] !== "folders") {
    return null
  }

  if (args[1] === "list") {
    if (hasHelp(args.slice(2))) {
      helpFor("folders list")
      return 0
    }

    printJson(await foldersListCommand())
    return 0
  }

  if (args.length === 1 || hasHelp(args.slice(1))) {
    helpFor("folders")
    return 0
  }

  return null
}

function runContextualHelp(args: string[]) {
  if (!hasHelp(args)) {
    return null
  }

  const command = args.filter((arg) => !arg.startsWith("-")).join(" ")
  if (!(command in HELP_BY_COMMAND)) {
    return null
  }

  helpFor(command)
  return 0
}

export async function runCli(argv: string[]) {
  const args = argv.filter((arg) => arg !== "--json")

  if (args.length === 0 || (hasHelp(args) && args.length === 1)) {
    printRootHelp()
    return 0
  }

  try {
    const result =
      (await runAuth(args)) ??
      (await runConfig(args)) ??
      (await runUser(args)) ??
      (await runBookmarks(args)) ??
      (await runFolders(args)) ??
      runContextualHelp(args)

    if (result !== null) {
      return result
    }

    throw new CliError("VALIDATION_ERROR", `Unknown command: ${args.join(" ")}`)
  } catch (error) {
    const cliError = toCliError(error)
    printJson(fail(cliError.code, cliError.message, cliError.details))
    return cliError.exitCode
  }
}
