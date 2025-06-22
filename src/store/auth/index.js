import { combineReducers } from '@reduxjs/toolkit'
import session from './sessionSlice'
import user from './userSlice'

console.log('🔐 Auth store loading...')

const reducer = combineReducers({
    session,
    user,
})

console.log('✅ Auth store loaded with reducers:', ['session', 'user'])

export default reducer 