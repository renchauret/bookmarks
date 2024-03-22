import { auth } from '@/app/auth'
import { createTab, deleteTab, retrieveTabs } from '@/app/db/db'
import { Session } from 'next-auth'
import { Tab } from '@/app/db/schema'

export const Tabs = async () => {
    const session: Session | null = await auth()
    let tabs: Tab[] = await retrieveTabs(session)

    return (
        <div className='text-white'>
            {tabs.map(tab => (
                <div key={tab.id}>
                    {tab.name}
                    <span>
                        {session && (
                            <button onClick={async () => {
                                'use server'
                                await deleteTab(session, tab.id)
                                tabs = await retrieveTabs(session)
                            }}>
                                New Tab
                            </button>
                        )}
                    </span>
                </div>
            ))}
            <span>
                {session && (
                    <button onClick={async () => {
                        'use server'
                        console.log('hello?')
                        await createTab(session.user.id, 'test')
                        tabs = await retrieveTabs(session)
                    }}>
                        New Tab
                    </button>
                )}
            </span>
        </div>
    )
}
