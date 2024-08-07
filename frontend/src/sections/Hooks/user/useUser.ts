import { useCallback, useMemo } from 'react'
import { type UserPrimitives } from '../../../modules/user/user/domain/User'
import { ApiUserRepository } from '../../../modules/user/user/infrastructure/UserApiRepository'
import { UserGetter } from '../../../modules/user/user/application/UserGetter'
import { UserCreator } from '../../../modules/user/user/application/UserCreator'
import { UserRemover } from '../../../modules/user/user/application/UserRemover'
import { UserResetPassword } from '../../../modules/user/user/application/UserResetPassword'


export interface UseUser {
    getUser: UserGetter
    createUser: (formData: UserPrimitives) => Promise<void>
    resetPassword: UserResetPassword
    deleteUser: UserRemover
}

export const useUser = (): UseUser => {
    const repository = useMemo(() => { return new ApiUserRepository() }, [])
    const getUser = useMemo(() => { return new UserGetter(repository) }, [repository])
    const deleteUser = useMemo(() => { return new UserRemover(repository) }, [repository])
    const resetPassword = useMemo(() => { return new UserResetPassword(repository) }, [repository])

    const createUser = useCallback(async (formData: UserPrimitives) => {
        return await new UserCreator(repository).create(formData)
    }, [repository])

    return {
        getUser,
        deleteUser,
        resetPassword,
        createUser
    }
}
