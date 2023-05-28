import ApplicationLogo from '@/components/ApplicationLogo'
import Link from 'next/link'
// import NavLink from '@/components/NavLink'
import ResponsiveNavLink from '@/components/ResponsiveNavLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import axios from '@/lib/axios'
import { updateLanguage } from '@/lib/store/slices/languageSlice'

const GuestNavigation = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const selector = useSelector(state => {
        return state
    })
    const dispatch = useDispatch()

    const [languages, setLanguages] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/languages')
                setLanguages(response.data)
            } catch (error) {
                // console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const selectLanguage = data => {
        dispatch(updateLanguage({ data }))
    }

    return (
        <nav className="bg-white border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
                            </Link>
                        </div>
                    </div>

                    {/* Settings Dropdown */}

                    <div className="flex items-center lg:order-2">
                        {/* <div className="hidden space-x-8 sm:-my-px sm:mr-10 sm:flex">
                            <NavLink href="/" active={router.pathname === '/'}>
                                Latest Article
                            </NavLink>
                            <NavLink href="/" active={router.pathname === '/'}>
                                Article
                            </NavLink>
                        </div>
                        */}
                        <a
                            href="/login"
                            className="text-gray-800 dark:text-black hover:text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            Log in
                        </a>
                        <a
                            href="/register"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Register
                        </a>
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <div className="p-3">
                            <Dropdown
                                align="right"
                                width="15"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div>
                                            Language :{' '}
                                            {selector.language.language}
                                        </div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                {languages.map((value, i) => {
                                    return (
                                        <DropdownButton
                                            key={i}
                                            onClick={() => {
                                                selectLanguage(value)
                                            }}>
                                            {value}
                                        </DropdownButton>
                                    )
                                })}
                            </Dropdown>
                        </div>
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default GuestNavigation
