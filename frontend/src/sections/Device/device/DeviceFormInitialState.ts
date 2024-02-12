import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { useDevice } from './useDevice'

interface defaultProps {
  serial: string
  activo: string
  statusId: number
  modelId: string
  categoryId: number
  brandId: string
  processorId?: string
  memoryRamCapacity?: number
  hardDriveCapacityId?: number
  hardDriveTypeId?: number
  operatingSystemArqId?: number
  OperatingSystemVersionId?: number
  macAddress?: string
  ipAddress?: string
  health?: number
}

const defaultInitialState: defaultProps = {
  serial: '',
  activo: '',
  statusId: 0,
  modelId: '',
  categoryId: 0,
  brandId: '',
  processorId: '',
  memoryRamCapacity: 0,
  hardDriveCapacityId: 0,
  hardDriveTypeId: 0,
  operatingSystemArqId: 0,
  OperatingSystemVersionId: 0,
  macAddress: '',
  ipAddress: '',
  health: 100
}
export const useDeviceInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { repository } = useAppContext()
  const { getDevice } = useDevice(repository)
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
          const { serial, activo, statusId, modelId, categoryId, brandId, computer, hardDrive } = device as DevicesMappedApiResponse
          setPreloadedDeviceState({ serial, activo, statusId, modelId, categoryId, brandId })
          if (computer !== null) {
            const { processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, OperatingSystemVersionId, macAddress, ipAddress } = computer
            setPreloadedDeviceState({ ...preloadedDeviceState, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, OperatingSystemVersionId, macAddress, ipAddress })
          }
          if (hardDrive !== null) {
            const { health, hardDriveCapacityId, hardDriveTypeId } = hardDrive
            setPreloadedDeviceState({ ...preloadedDeviceState, health, hardDriveCapacityId, hardDriveTypeId })
          }
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
