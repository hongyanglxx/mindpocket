const env = process.env as Record<string, string | undefined>

env.NODE_ENV ||= "test"
env.NEXT_PUBLIC_APP_URL ||= "http://127.0.0.1:3000"
env.BETTER_AUTH_URL ||= env.NEXT_PUBLIC_APP_URL
env.BETTER_AUTH_SECRET ||= "test-secret"
env.DATABASE_URL ||= "postgresql://postgres:postgres@127.0.0.1:5432/mindpocket"
