import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { userAiProvider, userAiProviderRelations } from "./schema/ai-provider"
import {
  account,
  accountRelations,
  deviceCode,
  deviceCodeRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
} from "./schema/auth"
import { bookmark, bookmarkRelations } from "./schema/bookmark"
import { chat, chatRelations, message, messageRelations } from "./schema/chat"
import { embedding } from "./schema/embedding"
import { folder, folderRelations } from "./schema/folder"
import { bookmarkTag, bookmarkTagRelations, tag, tagRelations } from "./schema/tag"

const schema = {
  user,
  session,
  account,
  verification,
  deviceCode,
  userRelations,
  sessionRelations,
  accountRelations,
  deviceCodeRelations,
  folder,
  folderRelations,
  bookmark,
  bookmarkRelations,
  tag,
  bookmarkTag,
  tagRelations,
  bookmarkTagRelations,
  chat,
  chatRelations,
  message,
  messageRelations,
  embedding,
  userAiProvider,
  userAiProviderRelations,
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is missing. Set it in Vercel or apps/web/.env.local")
}

declare global {
  // eslint-disable-next-line no-var
  var __mindpocketDbPool: Pool | undefined
}

function createPool() {
  return new Pool({ connectionString })
}

const pool = (() => {
  if (process.env.NODE_ENV === "production") {
    return createPool()
  }

  if (!globalThis.__mindpocketDbPool) {
    globalThis.__mindpocketDbPool = createPool()
  }

  return globalThis.__mindpocketDbPool
})()

export const db = drizzle(pool, { schema })
