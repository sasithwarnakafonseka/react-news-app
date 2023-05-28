// import Head from 'next/head'
// import { useRouter } from 'next/router'
import GuestNavigation from './GuestNavigation'

const GuestLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <GuestNavigation />

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default GuestLayout
