import { useCallback, useEffect, useMemo, useState } from 'react'
import { ApiUserRepository } from '../../../modules/user/user/infrastructure/UserApiRepository'
import { UserPrimitives } from '../../../modules/user/user/domain/User'
import { AllUserGetter } from '../../../modules/user/user/application/AllUserGetter'
import { UserGetter } from '../../../modules/user/user/application/UserGetter'
import { UserCreator } from '../../../modules/user/user/application/UserCreator'
import { UserRemover } from '../../../modules/user/user/application/UserRemover'
import { UserResetPassword } from '../../../modules/user/user/application/UserResetPassword'


export interface UseUser {
    user: UserPrimitives[]
    loading: boolean
    error: Error | null
    getUser: UserGetter
    createUser: (formData: UserPrimitives) => Promise<void>
    resetPassword: UserResetPassword
    deleteUser: UserRemover
}

export const useUser = (): UseUser => {
    const [user, setUser] = useState<UserPrimitives[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const repository = useMemo(() => { return new ApiUserRepository() }, [])

    async function createUser(formData: UserPrimitives) {
        return await new UserCreator(repository).create(formData)
    }

    const getUsers = useCallback(() => {
        setLoading(true)
        new AllUserGetter(repository)
            .get()
            .then((res) => {
                setUser(res)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [repository])


    useEffect(() => {
        getUsers()
        return () => {
            setUser([])
        }
    }, [getUsers])

    const getUser = useMemo(() => { return new UserGetter(repository) }, [repository])

    const deleteUser = new UserRemover(repository)

    const resetPassword = new UserResetPassword(repository)

    return {
        user,
        loading,
        error,
        getUser,
        deleteUser,
        resetPassword,
        createUser,

    }
}
