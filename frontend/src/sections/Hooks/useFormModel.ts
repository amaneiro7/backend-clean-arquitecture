/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { update, create } from '../services/api'
import { type MappedModelWithjoins } from '../../types/types'
import { toastMessage } from '../utils/toaster'
import { formEntries } from '../utils/formEntries'
import { useFormFieldData } from './useFormData'

interface INITIALSTATE {
  model: MappedModelWithjoins
  formMethod: 'create' | 'edit'
  loading: boolean
  loadFetching: boolean
}

const initialState: INITIALSTATE = {
  model: {
    id: '',
    name: '',
    categoryId: '',
    categoryName: '',
    brandId: '',
    brandName: ''
  },
  formMethod: 'create',
  loading: true,
  loadFetching: false
}

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state
}

const actionType = {
  initDeviceEdit: 'INIT_EDIT',
  initDeviceCreate: 'INIT_CREATE',
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
    model: {
      id: payload?.model?.id,
      name: payload?.model?.name,
      categoryId: payload?.model?.categoryId,
      categoryName: payload?.model?.categoryName,
      brandId: payload?.model?.brandId,
      brandName: payload?.model?.brandName
    }
  },
  [actionType.initDeviceCreate]: {
    ...state,
    loading: false,
    formMethod: 'create',
    brand: {
      id: '',
      name: '',
      categoryId: '',
      categoryName: '',
      brandId: '',
      brandName: ''
    }
  },
  [actionType.initState]: {
    ...initialState
  },
  [actionType.changeValue]: {
    ...state,
    model: {
      ...state.model,
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

export const useFormModel = () => {
  const { modelId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [{ model, loading, formMethod, loadFetching }, dispatch] = useReducer(reducer, initialState)
  const { brands, categories } = useFormFieldData({ })

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
        .then(async module => await module.getOne({ path: 'models', id: modelId }))
        .then(model => {
          dispatch({ type: actionType.initDeviceEdit, payload: { model } })
        })
        .catch(err => { console.error(err) })
    }

    dispatch({ type: actionType.initState })

    return () => {
      dispatch({ type: actionType.initState })
    }
  }, [modelId, location.state?.model])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch({ type: actionType.changeValue, payload: { name, value } })
  }

  const handleSave = async (event: React.FormEvent<HTMLElement>) => {
    try {
      dispatch({ type: actionType.startFetching })
      toastMessage({ message: 'Loading', type: 'loading' })
      event.preventDefault()
      const data = formEntries({ targetReference: event.target, formReference: 'modelForm' })
      const { message, error } = await create({ path: 'models', data })
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
      const data = formEntries({ targetReference: event.target, formReference: 'modelForm' })
      const { message, error } = await update({ path: 'models', id: modelId, data })
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
    navigate('/')
  }

  return {
    model,
    categories,
    brands,
    loading,
    formMethod,
    loadFetching,
    handleChange,
    handleSave,
    handleUpdate,
    handleClose
  }
}
