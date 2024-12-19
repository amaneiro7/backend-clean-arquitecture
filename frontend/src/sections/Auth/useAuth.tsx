import { useCallback, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { api } from '@/modules/shared/infraestructure/fetching'
import { type Repository } from '@/modules/shared/domain/repository'
import { type UserPrimitives } from '@/modules/user/user/domain/User'
import { Login } from '@/modules/user/auth/application/Login'

export interface UseAuth {
    getLogin: ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) => Promise<UserPrimitives>
    user: UserPrimitives | null
    logout: () => Promise<void>
    isSignin: boolean
    loading: boolean
}

export const useLogin = (repository: Repository): UseAuth => {
    const [token, setToken] = useState<string | null | undefined>()
    const [user, setUser] = useState<UserPrimitives | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isSignin, setIsSignin] = useState<boolean>(false)
    const location = useLocation()

    async function getLogin({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
        setLoading(true)
        return await new Login(repository)
            .run(email, password)
            .then((user) => {
                setUser(user)
                setToken(user.accessToken)
                setIsSignin(true)
            })
            .finally(() => setLoading(false))
    }

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization =
                !config._retry && token
                    ? `Bearer ${token}`
                    : config.headers.Authorization
            return config
        })

        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config

                if (
                    error.response.status === 401 &&
                    error.response.data.message === 'Unauthorized'
                ) {
                    try {
                        const response = await api.get('/api/refreshToken')

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
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [])

    const logout = useCallback(async () => {
        setUser(null)
        setToken(null)
        setIsSignin(false)
    }, [])

    return {
        getLogin,
        logout,
        loading,
        user,
        isSignin
    }
}
