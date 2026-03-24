import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function requireApiSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) {
    return {
      ok: false as const,
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  return {
    ok: true as const,
    session,
  }
}
