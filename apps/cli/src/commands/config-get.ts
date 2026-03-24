import { getConfigPath, readConfig } from "../lib/config.js"
import { ok } from "../lib/result.js"

export async function configGetCommand() {
  const config = await readConfig()
  return ok({
    serverUrl: config.serverUrl || null,
    hasSession: Boolean(config.session),
    configPath: getConfigPath(),
  })
}
