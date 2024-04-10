import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type ModelId } from '../../../modules/devices/model/domain/ModelId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ProcessorId } from '../../../modules/devices/fetures/processor/domain/ProcessorId'
import { type MemoryRamCapacity } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/MemoryRamCapacity'
import { type HardDriveCapacityId } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypeId } from '../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type OperatingSystemArqId } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type OperatingSystemId } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type MACAddress } from '../../../modules/devices/fetures/computer/domain/MACAddress'
import { type IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
import { type HardDriveHealth } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'

interface defaultProps {
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  modelId: Primitives<ModelId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  processorId?: Primitives<ProcessorId>
  memoryRamCapacity?: Primitives<MemoryRamCapacity>
  hardDriveCapacityId?: Primitives<HardDriveCapacityId>
  hardDriveTypeId?: Primitives<HardDriveTypeId>
  operatingSystemArqId?: Primitives<OperatingSystemArqId>
  OperatingSystemVersionId?: Primitives<OperatingSystemId>
  macAddress?: Primitives<MACAddress>
  ipAddress?: Primitives<IPAddress>
  health?: Primitives<HardDriveHealth>
}

const defaultInitialState: defaultProps = {
  serial: '',
  activo: '',
  statusId: '',
  modelId: '',
  categoryId: '',
  brandId: '',
  processorId: '',
  memoryRamCapacity: 0,
  hardDriveCapacityId: '',
  hardDriveTypeId: '',
  operatingSystemArqId: '',
  OperatingSystemVersionId: '',
  macAddress: '',
  ipAddress: '',
  health: 100
}
export const useDeviceInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { device: { getDevice } } = useAppContext()
  const [preloadedDeviceState, setPreloadedDeviceState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedDeviceState(defaultInitialState)
      return
    }

    if (location.state?.device !== undefined) {
      console.log('useDeviceInitialState', location.state)
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
