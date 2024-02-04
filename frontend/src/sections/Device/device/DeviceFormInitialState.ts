import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'

const defaultInitialState = {
  serial: '',
  activo: '',
  statusId: 1,
  modelId: '',
  categoryId: 1,
  brandId: ''
}
export const useDeviceInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getDevice } = useAppContext()
  const [preloadedDeviceState, setPreloadedDeviceState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedDeviceState(defaultInitialState)
      return
    }

    if (location.state?.device !== undefined) {
      const { device } = location.state
      setPreloadedDeviceState(device)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      getDevice.getById(id)
        .then(device => {
          const { serial, activo, statusId, modelId, categoryId, brandId } = device as DevicesMappedApiResponse
          setPreloadedDeviceState({ serial, activo, statusId, modelId, categoryId, brandId })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [id, location.state?.devices])

  return {
    preloadedDeviceState
  }
}
