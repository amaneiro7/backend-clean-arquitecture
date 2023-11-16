import { useEffect, useReducer } from 'react'
import { type Device } from '../types/types'
import { fetchDevice } from '../utils/fetchDeivce'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const initialState = {
  devices: [],
  loading: true
}

type Action =
| { type: 'INIT_DEVICES', payload: { devices: Device[] } }

interface State {
  devices: Device[]
  loading: boolean
}

const reducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_DEVICES') {
    const { devices } = action.payload
    return {
      ...state,
      loading: false,
      devices
    }
  }
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

export const useDevice = () => {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (location.state?.device) {
      dispatch({ type: 'INIT_DEVICES', payload: { devices } })
    } else {
      import('../utils/fetchDeivce').then(async module => await module.fetchDevice({ deviceId }))
        .then(devices => { dispatch({ type: 'INIT_DEVICES', payload: { devices } }) })
        .catch(err => { console.error(err) })
    }

    return () => {
    //   setDevice(null)
    }
  }, [deviceId])
}
