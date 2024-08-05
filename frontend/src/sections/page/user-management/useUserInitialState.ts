import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useUser } from '../../Hooks/user/useUser'
import { UserApiResponsePrimitives } from '../../../modules/shared/domain/types/responseTypes'

const initialState: UserApiResponsePrimitives = {
    id: undefined,
    name: '',
    lastName: '',
    email: '',
    roleId: 0,
    role: {
        id: undefined,
        name: '',
    }
}
export const useUserInitialState = (): {
    preloadedState: UserApiResponsePrimitives
    setResetState: () => void
    isAddForm: boolean
} => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { getUser } = useUser()
    const [preloadedState, setPreloadedState] = useState(initialState)


    const isAddForm = useMemo(() => {
        return location.pathname.includes('register')
    }, [location.pathname])

    const fetchUser = useCallback(() => {
        getUser.getById({ id })
            .then((user) => {
                const state = user as unknown as UserApiResponsePrimitives
                setPreloadedState(state)
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
