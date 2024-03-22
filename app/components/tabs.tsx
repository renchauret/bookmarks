import { auth } from '@/app/auth'
import { deleteTab, retrieveTabs, test } from '@/app/db/db'
import { Session } from 'next-auth'
import { Tab } from '@/app/db/schema'
import { ClientButton } from '@/app/components/client-button'

export const Tabs = async () => {
    const session: Session | null = await auth()
    let tabs: Tab[] = await retrieveTabs()

    return (
        <div className='text-white'>
            {tabs.map(tab => (
                <div key={tab.id}>
                    {tab.name}{' '}
                    {session && (
                        <ClientButton id={tab.id} text='X' serverAction={deleteTab} />
                    )}
                </div>
            ))}
            <span>
                {session && (
                    <ClientButton text='New Tab' serverAction={test} />
                )}
            </span>
        </div>
    )
}
