import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"

const AuthContext = createContext(undefined)

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return authContext
}

const AuthProvider = ({ children }) => {
    const  [token, setToken] = useState()

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await api.get('/api/me')
            } catch {
                setToken(null)
            }
      
            }
        fetchMe()
    }, [])

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = 
            !config_retry && token 
                ? `Bearer ${token}`
                : config.headers.Authorization
            return config
        })

        return () => {
            api.interceptos.request.eject(authInterceptor)
        }
    },[token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptos.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config

                if (
                    error.response.status === 403 && 
                    error.response.data.message === 'Unauthorized'
                ) {
                    try {
                        const response = await Api.get('/api/refreshToken')

                        setToken(response.data.accesToken)

                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}` 
                        originalRequest._retry = true

                        return api(originalRequest)
                    } catch {
                        setToken(null)
                    }
                }
                return Promise.reject(error)
            }
        )
        return () => {
            Api.interceptors.response.eject(refreshInterceptor)
        }
    }, [])
}