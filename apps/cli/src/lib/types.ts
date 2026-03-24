export interface StoredUser {
  id: string
  email: string
  name: string
}

export interface StoredSession {
  accessToken: string
  user: StoredUser
  obtainedAt: string
  expiresAt?: string
}

export interface CliConfig {
  serverUrl?: string
  session?: StoredSession
}

export interface CliSuccess<T> {
  ok: true
  data: T
}

export interface CliFailure {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type CliResult<T> = CliSuccess<T> | CliFailure

export interface CommandOptionHelp {
  flags: string
  description: string
}

export interface CommandArgumentHelp {
  name: string
  description: string
}

export interface CommandHelpMeta {
  command: string
  summary: string
  usage: string[]
  arguments: CommandArgumentHelp[]
  options: CommandOptionHelp[]
  authRequired: boolean
  output: string[]
  examples: string[]
  errors: string[]
}
