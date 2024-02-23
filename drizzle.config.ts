import type { Config } from "drizzle-kit";

export default {
    schema: "./app/db/schema.ts",
    out: "./migrations",
    driver: "pg",
    dbCredentials: {
        host: process.env.POSTGRES_HOST!,
        database: process.env.POSTGRES_DATABASE!,
        user: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        ssl: true
    },
    verbose: true,
    strict: true,
} satisfies Config;
