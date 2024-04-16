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
import { type EmployeeId } from '../../../modules/employee/employee/domain/EmployeeId'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type DeviceObservation } from '../../../modules/devices/devices/devices/domain/DeviceObservation'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type ComputerName } from '../../../modules/devices/fetures/computer/domain/ComputerName'
import { type DeviceId } from '../../../modules/devices/devices/devices/domain/DeviceId'

interface defaultProps {
  id?: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  modelId: Primitives<ModelId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  employeeId: Primitives<EmployeeId>
  locationId: Primitives<LocationId>
  observation: Primitives<DeviceObservation>
  computerName?: Primitives<ComputerName>
  processorId?: Primitives<ProcessorId>
  memoryRamCapacity?: Primitives<MemoryRamCapacity>
  hardDriveCapacityId?: Primitives<HardDriveCapacityId>
  hardDriveTypeId?: Primitives<HardDriveTypeId>
  operatingSystemArqId?: Primitives<OperatingSystemArqId>
  operatingSystemId?: Primitives<OperatingSystemId>
  macAddress?: Primitives<MACAddress>
  ipAddress?: Primitives<IPAddress>
  health?: Primitives<HardDriveHealth>
}

const defaultInitialState: defaultProps = {
  id: undefined,
  serial: '',
  activo: '',
  statusId: '',
  modelId: '',
  categoryId: '',
  brandId: '',
  employeeId: '',
  locationId: '',
  observation: '',
  computerName: '',
  processorId: '',
  memoryRamCapacity: 0,
  hardDriveCapacityId: '',
  hardDriveTypeId: '',
  operatingSystemArqId: '',
  operatingSystemId: '',
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

    if (location.state?.state !== undefined) {
      const { state } = location.state
      ProcessDeviceState(state)
    } else if (id === undefined) {
      navigate('/error')
    } else {
      getDevice.getById(id)
        .then(device => {
          ProcessDeviceState(device)
        })
        .catch(error => {
          console.error('useDeviceInitialState', error)
        })
    }
  }, [id, location.state?.state])

  function ProcessDeviceState (device: DevicePrimitives): void {
    const { serial, activo, statusId, modelId, categoryId, brandId, employeeId, locationId, observation, computer, hardDrive } = device as DevicesMappedApiResponse
    setPreloadedDeviceState({ id, serial, activo, statusId, modelId, categoryId, brandId, employeeId, locationId, observation })
    if (computer !== null) {
      const { computerName, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, operatingSystemId, macAddress, ipAddress } = computer
      setPreloadedDeviceState({ ...preloadedDeviceState, computerName, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, operatingSystemId, macAddress, ipAddress })
    }
    if (hardDrive !== null) {
      const { health, hardDriveCapacityId, hardDriveTypeId } = hardDrive
      setPreloadedDeviceState({ ...preloadedDeviceState, health, hardDriveCapacityId, hardDriveTypeId })
    }
  }

  return {
    preloadedDeviceState
  }
}
