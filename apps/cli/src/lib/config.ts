import { chmod, mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import type { CliConfig } from "./types.js"

const CONFIG_DIR = join(homedir(), ".config", "mindpocket")
const CONFIG_PATH = join(CONFIG_DIR, "config.json")

export function getConfigPath() {
  return CONFIG_PATH
}

export async function readConfig(): Promise<CliConfig> {
  try {
    const raw = await readFile(CONFIG_PATH, "utf8")
    return JSON.parse(raw) as CliConfig
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {}
    }
    throw error
  }
}

export async function writeConfig(config: CliConfig) {
  await mkdir(dirname(CONFIG_PATH), { recursive: true })
  await writeFile(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`, "utf8")
  await chmod(CONFIG_PATH, 0o600)
}
