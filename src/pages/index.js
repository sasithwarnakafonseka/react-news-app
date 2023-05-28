import Home from '@/components/Home'
import AppLayout from '@/components/Layouts/AppLayout'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'

const Index = () => {
    const { user } = useAuth({ middleware: 'guest' })
    if (user) {
        return (
            <AppLayout>
                <Home auth={true} />
            </AppLayout>
        )
    } else {
        return (
            <GuestLayout>
                <Home auth={false} />
            </GuestLayout>
        )
    }
}

export default Index
