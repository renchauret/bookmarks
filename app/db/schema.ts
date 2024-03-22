import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export interface User {
    id: string
    email: string
    password: string
}
export const users = pgTable('User', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    email: varchar('email', { length: 64 }).notNull().unique(),
    password: varchar('password', { length: 64 }).notNull()
})

export interface Tab {
    id: string
    userId: string
    name: string
}
export const tabs = pgTable('Tab', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id').notNull().references(() => users.id),
    name: varchar('name', { length: 64 }).notNull()
})

export interface Bookmark {
    id: string
    tabId: string
    url: string
    title: string | null
    row: number
    column: number
}
export const bookmarks = pgTable('Bookmark', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    tabId: uuid('tab_id').notNull().references(() => tabs.id),
    url: varchar('url', { length: 256 }).notNull(),
    title: varchar('title', { length: 64 }),
    row: integer('row').notNull(),
    column: integer('row').notNull(),
})
