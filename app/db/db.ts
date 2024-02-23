import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import postgres from 'postgres'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { bookmarks, tabs, users } from '@/app/db/schema'

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
let db = drizzle(client)

export async function getUser(email: string) {
    return db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string) {
    let salt = genSaltSync(10)
    let hash = hashSync(password, salt)

    return db.insert(users).values({ email, password: hash })
}

export async function createTab(userId: string, name: string) {
    return db.insert(tabs).values({ userId, name })
}

export async function createBookmark(tabId: string, url: string, title: string, row: number, column: number) {
    return db.insert(bookmarks).values({ tabId, url, title, row, column })
}
