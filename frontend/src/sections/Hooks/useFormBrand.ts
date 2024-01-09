/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { update, create } from '../services/api'
import { type Brand } from '../../types/types'
import { toastMessage } from '../utils/toaster'
import { formEntries } from '../utils/formEntries'

interface INITIALSTATE {
  brand: Brand
  formMethod: 'create' | 'edit'
  loading: boolean
  loadFetching: boolean
}

const initialState: INITIALSTATE = {
  brand: {
    id: '',
    name: ''
  },
  formMethod: 'create',
  loading: true,
  loadFetching: false
}

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state
}

const actionType = {
  initDeviceEdit: 'INIT_DEVICES_EDIT',
  initDeviceCreate: 'INIT_DEVICES_CREATE',
  initState: 'INIT_STATE',
  changeValue: 'CHANGE_VALUE',
  startFetching: 'START_FETCHING',
  finishFetching: 'FINISH_FETCHING'
}

const reducerObject = (state, payload) => ({
  [actionType.initDeviceEdit]: {
    ...state,
    loading: false,
    formMethod: 'edit',
    brand: {
      id: payload?.brand?.id,
      name: payload?.brand?.name
    }
  },
  [actionType.initDeviceCreate]: {
    ...state,
    loading: false,
    formMethod: 'create',
    brand: {
      id: '',
      name: ''
    }
  },
  [actionType.initState]: {
    ...initialState
  },
  [actionType.changeValue]: {
    ...state,
    brand: {
      ...state.brand,
      [payload?.name]: payload?.value
    }
  },
  [actionType.startFetching]: {
    ...state,
    loadFetching: true
  },
  [actionType.finishFetching]: {
    ...state,
    loadFetching: false
  }
})

export const useFormBrand = () => {
  const { brandId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [{ brand, loading, formMethod, loadFetching }, dispatch] = useReducer(reducer, initialState)
  console.log(location)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      dispatch({ type: actionType.initDeviceCreate })
      return
    }

    if (location.state?.brand) {
      const { brand } = location.state
      dispatch({ type: actionType.initDeviceEdit, payload: { brand } })
    } else {
      import('../services/api')
        .then(async module => await module.getOne({ path: 'brands', id: brandId }))
        .then(brand => {
          dispatch({ type: actionType.initDeviceEdit, payload: { brand } })
        })
        .catch(err => { console.error(err) })
    }

    dispatch({ type: actionType.initState })

    return () => {
      dispatch({ type: actionType.initState })
    }
  }, [brandId, location.state?.brand])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch({ type: actionType.changeValue, payload: { name, value } })
  }

  const handleSave = async (event: React.FormEvent<HTMLElement>) => {
    try {
      dispatch({ type: actionType.startFetching })
      toastMessage({ message: 'Loading', type: 'loading' })
      event.preventDefault()
      const data = formEntries({ targetReference: event.target, formReference: 'brandForm' })
      const { message, error } = await create({ path: 'brands', data })
      toastMessage({ message, type: error ? 'error' : 'success' })
      dispatch({ type: actionType.finishFetching })
      if (!error) {
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (event: React.FormEvent<HTMLElement>) => {
    try {
      dispatch({ type: actionType.startFetching })
      toastMessage({ message: 'Loading', type: 'loading' })
      event.preventDefault()
      const data = formEntries({ targetReference: event.target, formReference: 'brandForm' })
      const { message, error } = await update({ path: 'brands', id: brandId, data })
      toastMessage({ message, type: error ? 'error' : 'success' })
      dispatch({ type: actionType.finishFetching })
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    navigate(-1)
  }

  return {
    brand: brand.name,
    loading,
    formMethod,
    loadFetching,
    handleChange,
    handleSave,
    handleUpdate,
    handleClose
  }
}
