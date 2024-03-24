'use client'

import { useState } from 'react'
import { deleteTab, retrieveTabs, test } from '@/app/db/db'
import { Session } from 'next-auth'
import { Tab } from '@/app/db/schema'
import { ClientButton } from '@/app/components/client-button'
import { TabView } from '@/app/components/tab-view'

export const Tabs = ({ initialTabs, session }: { initialTabs: Tab[], session: Session | null }) => {
    const [tabs, setTabs] = useState(initialTabs)

    const deleteAndSet = async (id: string) => {
        await deleteTab(id)
        const updatedTabs = await retrieveTabs()
        setTabs(updatedTabs)
    }

    return (
        <div className='text-white'>
            {tabs.map(tab => (
                <TabView key={tab.id} tab={tab} session={session} deleteTab={deleteAndSet} />
            ))}
            <span>
                {session && (
                    <ClientButton text='New Tab' serverAction={test} />
                )}
            </span>
        </div>
    )
}
