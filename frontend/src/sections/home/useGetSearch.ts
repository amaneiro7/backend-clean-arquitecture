import { useMemo, useReducer } from 'react'
import { useDevice } from '../Hooks/useDevice'
import { type Repository } from '../../modules/shared/domain/repository'
import { useAppContext, useAppContext } from '../Context/AppContext'

const initialState = {
  searchValueCategory: {
    value: '',
    dbReferences: 'categoryId',
    typeOfValue: 'number'
  },
  searchValueSerial: {
    value: '',
    dbReferences: 'serial',
    typeOfValue: 'string'
  },
  searchValueActivo: {
    value: '',
    dbReferences: 'activo',
    typeOfValue: 'string'
  },
  searchValueBrand: {
    value: '',
    dbReferences: 'brandId',
    typeOfValue: 'number'
  },
  searchValueModel: {
    value: '',
    dbReferences: 'modelId',
    typeOfValue: 'number'
  },
  statusInput: {
    value: '',
    dbReferences: 'status',
    typeOfValue: 'string'
  }
}

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state
}

const actionType = {
  changeValue: 'CHANGE_VALUE',
  params: 'PARAMS'
}

const reducerObject = (state, payload) => ({
  [actionType.changeValue]: {
    ...state,
    [payload?.name]: {
      ...state[payload?.name],
      value: String(payload?.value)
    }
  },
  [actionType.params]: {
    ...state,
    params: {

    }
  }
})

export const useGetSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { devices } = useAppContext()

  const searchedDevice = () => {
    if (JSON.stringify(initialState) === JSON.stringify(state)) {
      return devices
    }
    const searchedValue = {}
    Object.keys(state).forEach(key => {
      if (state[key].value !== '') {
        searchedValue[state[key].dbReferences] = state[key].value
      }
    })
    // return device.filter(item => Object.keys(searchedValue).every(key => item[key] === searchedValue[key]))
    return devices.filter(item => Object.entries(searchedValue).every(entry => {
      const [key, value] = entry
      return String(item[key]).toLowerCase().includes(value.toLowerCase())
    }))
  }

  const filteredDevice = useMemo(() => searchedDevice(), [state, devices])

  const handleChange = ({ target }) => {
    const { name, value } = target
    dispatch({ type: actionType.changeValue, payload: { name, value } })
    // const params = { [state[name].dbReferences]: value }
    // setSearchParams(params)
  }

  return {
    devices: filteredDevice,
    state,
    handleChange
  }
}
