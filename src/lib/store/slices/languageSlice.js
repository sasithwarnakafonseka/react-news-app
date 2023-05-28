import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: 'en',
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        updateLanguage: (state, action) => {
            const { data } = action.payload
            state.language = data // Update the language property of the state object
        },
    },
})

export const { updateLanguage } = languageSlice.actions
export default languageSlice.reducer
