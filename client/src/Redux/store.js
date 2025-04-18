import { configureStore } from '@reduxjs/toolkit'
import userAuthorReducer from './Slices/UserAuthorSlice'

export const store = configureStore({
    reducer: {
        userAuthorLoginReducer: userAuthorReducer
    }
})
