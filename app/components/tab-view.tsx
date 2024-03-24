'use client'

import { Session } from 'next-auth'
import { Tab } from '@/app/db/schema'

export const TabView = ({
    tab,
    session,
    deleteTab
}: {
    tab: Tab,
    session: Session | null,
    deleteTab: (id: string) => void
}) => {
    const deleteTabWithId = deleteTab.bind(null, tab.id)
    return (
        <div>
            {tab.name}{' '}
            {session && (
                <button
                    id={tab.id}
                    onClick={deleteTabWithId}
                >
                    X
                </button>
            )}
        </div>
    )
}
