/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const initialState = {
  device: [],
  loading: true
}

const reducer = (state, action) => {
  if (action.type === 'INIT_DEVICES') {
    const { device } = action.payload

    return {
      ...state,
      loading: false,
      device
    }
  }
  if (action.payload === 'INIT_STATE') {
    return {
      ...state,
      device: []
    }
  }

  if (action.type === 'CHANGE_VALUE') {
    const { name, value } = action.payload
    const newData = {
      ...state.device,
      [name]: value
    }

    console.log(newData)

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

export const useEditDevice = () => {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
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
      dispatch({ type: 'NIT_STATE' })
    }
  }, [deviceId, location.state.devices])

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(event.target.value)

    dispatch({ type: 'CHANGE_VALUE', payload: { name, value } })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const entries = formData.entries()
    console.log(entries)
    for (const entry of entries) {
      console.log(entry)
    }
  }

  const handleClose = () => {
    navigate('/')
  }

  return {
    device,
    loading,
    handleChange,
    handleSubmit,
    handleClose
  }
}
