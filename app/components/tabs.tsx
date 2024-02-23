import { auth } from '@/app/auth'
import { getTabs, getTabsByEmail } from '@/app/db/db'
import { Session } from 'next-auth'

export const Tabs = async () => {
    const session = await auth()
    const tabs = await retrieveTabs(session)
    // const tabs = []

    return (
        <div>
            {tabs.map(tab => (
                <div key={tab.id}>
                    {tab.name}
                </div>
            ))}
        </div>
    )
}

const retrieveTabs = async (session: Session | null) => {
    'use server'
    return session && session.user ?
        await getTabs(session.user.id) :
        await getTabsByEmail('renaudchauret@gmail.com')
}
