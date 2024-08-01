import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useUser } from '../../Hooks/user/useUser'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type RoleId } from '../../../modules/user/role/domain/RoleId'
import { type UserEmail } from '../../../modules/user/user/domain/UserEmail'
import { type UserLastName } from '../../../modules/user/user/domain/UserLastName'
import { type UserName } from '../../../modules/user/user/domain/UserName'
import { type UserId } from '../../../modules/user/user/domain/UserId'

const initialState: InitialUserState = {
    id: undefined,
    name: '',
    lastName: '',
    email: '',
    roleId: 0
}

export interface InitialUserState {
    id?: Primitives<UserId>
    name: Primitives<UserName>
    lastName: Primitives<UserLastName>
    email: Primitives<UserEmail>
    roleId: Primitives<RoleId>
}
export const useUserInitialState = (): {
    preloadedState: InitialUserState
    setResetState: (currentState?: InitialUserState) => void
    isAddForm: boolean
} => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { getUser } = useUser()
    const [preloadedState, setPreloadedState] = useState(initialState)

    const isAddForm = useMemo(() => {
        return !location.state
    }, [location.state])

    const fetchUser = useCallback(() => {
        getUser.getById({ id })
            .then(user => {
                setPreloadedState(user)
            })
            .catch(error => {
                console.error('useUserInitialState', error)
            })
    }, [getUser, id])

    const setResetState = () => {
        if (isAddForm) {
            setPreloadedState({ id: undefined, ...initialState })
        } else {
            fetchUser()
        }
    }


    useEffect(() => {
        if (isAddForm) {
            setPreloadedState(initialState)
            return
        }

        if (location.state?.state !== undefined) {
            console.log('hola')
            const user = location.state?.state
            setPreloadedState(user)
        } else {
            if (!id) {
                navigate('/error')
                return
            }
            fetchUser()
        }
    }, [fetchUser, id, isAddForm, location.state?.state, navigate])


    return {
        preloadedState,
        setResetState,
        isAddForm
    }
}
