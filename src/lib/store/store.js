import { configureStore } from '@reduxjs/toolkit'

import { persistStore } from 'redux-persist'

import language from './slices/languageSlice'
export const store = configureStore({
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        language,
    },
})

export const persistor = persistStore(store)
