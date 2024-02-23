import Link from 'next/link'

export const SignInButton = () => {
    return (
        <Link
            href='/login'
            className='text-stone-400 underline hover:text-stone-200 transition-all'
        >
            Sign In
        </Link>
    )
}