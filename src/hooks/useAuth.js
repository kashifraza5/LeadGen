import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUser, initialState } from '@/store/auth/userSlice'
import { apiSignOut, apiSignUp, getLogin, onLogout } from '@/services/AuthService'
import { onSignInSuccess, onSignOutSuccess, setSessionStart } from '@/store/auth/sessionSlice'
// import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate, useLocation } from 'react-router-dom'
// import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    // const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)
    
    // Get redirectUrl from query parameters
    const getRedirectUrl = () => {
        const urlParams = new URLSearchParams(location.search)
        const redirectUrl = urlParams.get(REDIRECT_URL_KEY)
        return redirectUrl || "/dashboard"
    }

    const signIn = async (values) => {
        setLoading(true)
        console.log("🚀 ~ signIn ~ values being sent:", values)
        try {
            console.log("🚀 ~ signIn ~ values being sent:", values)
            const resp = await getLogin(values)
            console.log("🚀 ~ signIn ~ resp:", resp)
            if (resp.status===200) {
                // Handle new response structure with access and refresh tokens
                const { access, refresh, user } = resp.data
                console.log("🚀 ~ signIn ~ access:", access)
                console.log("🚀 ~ signIn ~ refresh:", refresh)
                console.log("🚀 ~ signIn ~ user:", user)
                dispatch(onSignInSuccess({ access, refresh }))
                
                if (user) {
                    dispatch(
                        setUser({
                            avatar: '',
                            userName: `${user.first_name} ${user.last_name}`,
                            authority: [user.role],
                            email: user.email,
                            id: user.id,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            role: user.role,
                            company: user.company
                        })
                    )
                }
                
                const redirectUrl = getRedirectUrl()
                console.log('🚀 ~ signIn ~ redirecting to:', redirectUrl)
                console.log('🚀 ~ signIn ~ user data set:', user)
                
                // Small delay to ensure Redux state is updated
                setTimeout(() => {
                    navigate(redirectUrl, { replace: true })
                }, 100)
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            console.error("🚀 ~ signIn ~ error details:", errors)
            console.error("🚀 ~ signIn ~ error response:", errors?.response)
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (values) => {
        setLoading(true)
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { access, refresh, user } = resp.data
                dispatch(onSignInSuccess({ access, refresh }))
                if (user) {
                    dispatch(
                        setUser({
                            avatar: '',
                            userName: `${user.first_name} ${user.last_name}`,
                            authority: [user.role],
                            email: user.email,
                            id: user.id,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            role: user.role,
                            company: user.company
                        })
                    )
                }
                const redirectUrl = getRedirectUrl()
                console.log('🚀 ~ signUp ~ redirecting to:', redirectUrl)
                console.log('🚀 ~ signUp ~ user data set:', user)
                
                // Small delay to ensure Redux state is updated
                setTimeout(() => {
                    navigate(redirectUrl, { replace: true })
                }, 100)
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate("/")
    }

    const signOut = async () => {
        setLoading(true)
        try {
            // Call server to invalidate refresh token
            await onLogout()
            console.log('✅ Logout successful - token invalidated on server')
        } catch (error) {
            console.error('❌ Logout error:', error)
            // Even if server logout fails, we should still logout locally
        } finally {
            // Always logout locally regardless of server response
            handleSignOut()
            setLoading(false)
        }
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
        loading,
    }
}

export default useAuth
