import { auth } from '@/app/auth'
import { retrieveTabs } from '@/app/db/db'
import { Session } from 'next-auth'
import { Tab } from '@/app/db/schema'
import { Tabs } from '@/app/components/tabs'
export const TabsWrapper = async () => {
    const session: Session | null = await auth()
    let tabs: Tab[] = await retrieveTabs()

    return <Tabs initialTabs={tabs} session={session} />
}
