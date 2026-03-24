export class CliError extends Error {
  code: string
  details?: unknown
  exitCode: number

  constructor(code: string, message: string, details?: unknown, exitCode = 1) {
    super(message)
    this.name = "CliError"
    this.code = code
    this.details = details
    this.exitCode = exitCode
  }
}

export function toCliError(error: unknown): CliError {
  if (error instanceof CliError) {
    return error
  }

  if (error instanceof Error) {
    return new CliError("INTERNAL_ERROR", error.message)
  }

  return new CliError("INTERNAL_ERROR", "Unknown error", error)
}
