'use server'

import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import postgres from 'postgres'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { Bookmark, bookmarks, Tab, tabs, User, users } from '@/app/db/schema'
import { Session } from 'next-auth'

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
let db = drizzle(client)

export const getUser = async (email: string): Promise<User | null> => {
    const results = await db.select().from(users).where(eq(users.email, email))
    return results.length > 0 ? results[0] : null
}

export const createUser = async (email: string, password: string) => {
    let salt = genSaltSync(10)
    let hash = hashSync(password, salt)

    return db.insert(users).values({ email, password: hash })
}

export const retrieveTabs = async (session: Session | null): Promise<Tab[]> => {
    return (
        session ?
            await getTabs(session.user.id) :
            await getTabsByEmail('renaudchauret@gmail.com')
    ) ?? []
}

const getTabs = async (userId: string): Promise<Tab[]> => {
    return db.select().from(tabs).where(eq(tabs.userId, userId))
}

const getTabsByEmail = async (email: string): Promise<Tab[]> => {
    const user = await getUser(email)
    return user ? getTabs(user.id) : []
}

const getTab = async (tabId: string): Promise<Tab | null> => {
    const results = await db.select().from(tabs).where(eq(tabs.id, tabId))
    return results.length > 0 ? results[0] : null
}

export const createTab = async (session: Session, name: string) => {
    return db.insert(tabs).values({ userId: session.user.userId, name })
}

export const deleteTab = async (session: Session, tabId: string) => {
    const tab = await getTab(tabId)
    if (!tab || tab.userId !== session.user.userId) {
        throw new Error('Invalid tab')
    }
    db.delete(bookmarks).where(eq(bookmarks.tabId, tabId))
    return db.delete(tabs).where(eq(tabs.id, tabId))
}

export const getBookmarks = async (tabId: string): Promise<Bookmark[]> => {
    return db.select().from(bookmarks).where(eq(bookmarks.tabId, tabId))
}

export const createBookmark = async (session: Session, bookmark: Bookmark) => {
    const tab = await getTab(bookmark.tabId)
    if (!tab || tab.userId !== session.user.userId) {
        throw new Error('Invalid tab')
    }
    return db.insert(bookmarks).values(bookmark)
}
