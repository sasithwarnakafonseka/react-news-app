import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux'
import { store } from '../lib/store/store'
const App = ({ Component, pageProps }) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
)

export default App
