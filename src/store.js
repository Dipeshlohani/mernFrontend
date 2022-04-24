import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './reducers/auth'

const store = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer
    }
})
export default store;