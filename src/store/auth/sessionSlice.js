import { createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie'

console.log('🔑 Session slice loading...')

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        refreshToken: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload.access
            state.refreshToken = action.payload.refresh
            Cookie.set('token', action.payload.access, {
                expires: 1,
                secure: true,
                sameSite: 'None',
            })
            Cookie.set('refreshToken', action.payload.refresh, {
                expires: 7,
                secure: true,
                sameSite: 'None',
            })
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
            state.refreshToken = ''
            // Clear cookies
            Cookie.remove('token')
            Cookie.remove('refreshToken')
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        setSessionStart: (state, action) => {
            state.saleSession = action.payload
        },
    },
})

console.log('✅ Session slice loaded')

export const { onSignInSuccess, onSignOutSuccess, setToken, setRefreshToken, setSessionStart } =
    sessionSlice.actions

export default sessionSlice.reducer
