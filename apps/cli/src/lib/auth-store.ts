import { readConfig, writeConfig } from "./config.js"
import type { CliConfig, StoredSession } from "./types.js"

interface KeytarModule {
  getPassword(service: string, account: string): Promise<string | null>
  setPassword(service: string, account: string, password: string): Promise<void>
  deletePassword(service: string, account: string): Promise<boolean>
}

const KEYTAR_SERVICE = "mindpocket-cli"
const KEYTAR_ACCOUNT = "default"

async function loadKeytar(): Promise<KeytarModule | null> {
  try {
    const mod = (await new Function("return import('keytar')")()) as KeytarModule
    return mod
  } catch {
    return null
  }
}

function toPersistedConfig(config: CliConfig, session: StoredSession | null): CliConfig {
  if (!session) {
    return {
      ...config,
      session: undefined,
    }
  }

  return {
    ...config,
    session: {
      ...session,
      accessToken: "",
    },
  }
}

export async function getStoredState() {
  const config = await readConfig()
  const keytar = await loadKeytar()

  if (!config.session) {
    return config
  }

  const accessToken = keytar
    ? await keytar.getPassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT)
    : config.session.accessToken || null

  if (!accessToken) {
    return {
      ...config,
      session: undefined,
    }
  }

  return {
    ...config,
    session: {
      ...config.session,
      accessToken,
    },
  }
}

export async function storeSession(session: StoredSession, serverUrl?: string) {
  const config = await readConfig()
  const keytar = await loadKeytar()

  if (keytar) {
    await keytar.setPassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT, session.accessToken)
  }

  const nextConfig = toPersistedConfig(
    {
      ...config,
      serverUrl: serverUrl || config.serverUrl,
    },
    keytar ? session : session
  )

  if (!keytar) {
    nextConfig.session = session
  }

  await writeConfig(nextConfig)
}

export async function clearSession() {
  const config = await readConfig()
  const keytar = await loadKeytar()

  if (keytar) {
    await keytar.deletePassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT)
  }

  await writeConfig({
    ...config,
    session: undefined,
  })
}

export async function setServerUrl(serverUrl: string) {
  const config = await readConfig()
  await writeConfig({
    ...config,
    serverUrl,
  })
}
