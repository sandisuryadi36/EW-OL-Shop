import { configureStore } from '@reduxjs/toolkit'
import sliceReducer from './data/slice'

export default configureStore({
    reducer: {
        slice: sliceReducer
    },
    middleware:
        (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
})