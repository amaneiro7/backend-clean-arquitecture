import { useEffect, useReducer } from 'react'
import { type Device } from '../types/types'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const initialState = {
  device: [],
  loading: true
}

type Action =
| { type: 'INIT_DEVICES', payload: { device: Device } }
| { type: 'CHANGE_VALUE', payload: { name: string, value: string } }
| { type: 'START', payload: { loading: true } }

interface State {
  device: Device
  loading: boolean
}

const reducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_DEVICES') {
    const { device } = action.payload

    return {
      ...state,
      loading: false,
      device
    }
  }
  if (action.type === 'CHANGE_VALUE') {
    const { name, value } = action.payload
    const newData = {
      ...state.device,
      [name]: value
    }

    return {
      ...state,
      device: newData
    }
  }
  if (action.type === 'START') {
    const { loading } = action.payload
    return {
      ...state,
      loading
    }
  }
  return state
}

// const reducerObject = (state: State, payload) => ({
//   CHANGEVALUE: {
//     ...state,
//     [payload?.name]: payload?.value
//   },
//   START: {
//     ...state,
//     loading: true
//   },
//   INITIAL: {
//     ...state,
//     loading: false,
//     seria: payload?.serial
//   }
// })

export const useEditDevice = (): {
  device: Device
  loading: boolean
  handleChange: (event) => void
  handleSubmit: (event) => void
} => {
  const { deviceId } = useParams()
  const location = useLocation()
  // const navigate = useNavigate()
  const [{ device, loading }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (location.state?.devices) {
      const { device } = location.state
      dispatch({ type: 'INIT_DEVICES', payload: { device } })
    } else {
      import('../utils/fetchDevice').then(async module => await module.fetchDevice({ deviceId }))
        .then(device => {
          dispatch({ type: 'INIT_DEVICES', payload: { device } })
        })
        .catch(err => { console.error(err) })
    }

    return () => {
    //   setDevice(null)
    }
  }, [deviceId, location.state.devices])

  const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = event.target
    dispatch({ type: 'CHANGE_VALUE', payload: { name, value } })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target)
  }

  return {
    device,
    loading,
    handleChange,
    handleSubmit
  }
}
