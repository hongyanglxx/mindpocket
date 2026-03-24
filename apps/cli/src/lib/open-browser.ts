import { spawn } from "node:child_process"

function getOpenCommand(platform: NodeJS.Platform) {
  if (platform === "darwin") {
    return "open"
  }

  if (platform === "win32") {
    return "start"
  }

  return "xdg-open"
}

export function openBrowser(url: string) {
  const platform = process.platform
  const command = getOpenCommand(platform)

  return new Promise<boolean>((resolve) => {
    const child = spawn(command, [url], {
      shell: platform === "win32",
      stdio: "ignore",
      detached: true,
    })

    child.on("error", () => resolve(false))
    child.unref()
    resolve(true)
  })
}
