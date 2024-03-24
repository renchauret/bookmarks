import Link from 'next/link'
import { auth } from '@/app/auth'
import { SignInButton } from '@/app/components/sign-in-button'
import { TabsWrapper } from '@/app/components/tabs-wrapper'

export default async function Page() {
    let session = await auth()

    return (
        <div className='flex h-screen bg-black'>
            <div className='w-screen h-screen flex flex-col justify-center items-center'>
                {session ? <p className="text-white"></p> : <SignInButton/>}
                <TabsWrapper />
                <div className='flex space-x-3'>
                    <Link
                        href='/protected'
                        className='text-stone-400 underline hover:text-stone-200 transition-all'
                    >
                      Protected Page
                    </Link>
                    <p className='text-white'>·</p>
                    <a
                        href='https://vercel.com/templates/next.js/prisma-postgres-auth-starter'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-stone-400 underline hover:text-stone-200 transition-all'
                    >
                      Deploy to Vercel
                    </a>
                </div>
            </div>
        </div>
    )
}
