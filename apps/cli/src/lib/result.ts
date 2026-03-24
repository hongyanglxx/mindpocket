import type { CliFailure, CliSuccess } from "./types.js"

export function ok<T>(data: T): CliSuccess<T> {
  return { ok: true, data }
}

export function fail(code: string, message: string, details?: unknown): CliFailure {
  return {
    ok: false,
    error: {
      code,
      message,
      details,
    },
  }
}

export function printJson(value: unknown) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`)
}

export function printStderr(message: string) {
  process.stderr.write(`${message}\n`)
}
