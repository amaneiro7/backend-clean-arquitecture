import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDevice } from './useDevice'
import { type HistoryApiResponse, type DevicesApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ProcessorId } from '../../../modules/devices/fetures/processor/domain/ProcessorId'
import { type MemoryRamCapacity } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
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
import { type MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'
import { MemoryRamTypeName } from '../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeName'

export interface DefaultProps {
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
  memoryRam?: Primitives<MemoryRamValues>[]
  memoryRamSlotQuantity?: Primitives<MemoryRamSlotQuantity>
  memoryRamType?: Primitives<MemoryRamTypeName>
  history: HistoryApiResponse[]
  updatedAt?: string
}

const defaultInitialState: DefaultProps = {
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
  health: 100,
  updatedAt: undefined,
  memoryRamSlotQuantity: undefined,
  memoryRamType: '',
  memoryRam: [],
  history: []
}
export const useDeviceInitialState = (): {
  preloadedDeviceState: DefaultProps
  setResetState: (currentState?: DefaultProps) => void
  isAddForm: boolean
} => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getDevice } = useDevice()
  const [preloadedDeviceState, setPreloadedDeviceState] = useState(defaultInitialState)

  const setResetState = (currentState?: DefaultProps) => {
    if (location.pathname.includes('add')) {
      setPreloadedDeviceState({ id: undefined, ...defaultInitialState })
    } else if (currentState === undefined) {
      setPreloadedDeviceState({ id: undefined, ...defaultInitialState })
    } else {
      const updatedAt = new Date().toISOString()
      setPreloadedDeviceState(prev => ({ ...prev, ...currentState, updatedAt }))
    }
  }

  const isAddForm = useMemo(() => {
    return !location.state
  }, [location])

  useEffect(() => {
    if (isAddForm) {
      setPreloadedDeviceState(defaultInitialState)
      return
    }
    if (location.state?.state) {
      const { state } = location.state
      processDeviceState(state)
    } else if (id === undefined) {
      navigate('/error')
    } else {
      getDevice.getById(id)
        .then(device => {
          processDeviceState(device)
        })
        .catch(error => {
          console.error('useDeviceInitialState', error)
        })
    }
  }, [id, location.state?.state, location.pathname])

  function processDeviceState(device: DevicePrimitives): void {
    const { serial, activo, statusId, model, modelId, categoryId, brandId, employeeId, locationId, observation, computer, hardDrive, history, updatedAt } = device as DevicesApiResponse
    setPreloadedDeviceState((prev) => ({ ...prev, id, serial, activo: activo ?? '', statusId, modelId, categoryId, brandId, employeeId, locationId, observation, history, updatedAt }))
    if (computer !== null) {
      const { computerName, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, operatingSystemId, macAddress, ipAddress, memoryRam } = computer
      let memoryRamSlotQuantity: undefined | number
      let memoryRamType: string
      if (model?.modelComputer !== null) {
        memoryRamSlotQuantity = model?.modelComputer.memoryRamSlotQuantity
        memoryRamType = model?.modelComputer.memoryRamType.name
      } else if (model?.modelLaptop !== null) {
        memoryRamSlotQuantity = model?.modelLaptop.memoryRamSlotQuantity
        memoryRamType = model?.modelLaptop.memoryRamType.name
      } else {
        memoryRamSlotQuantity = undefined
        memoryRamType = ''
      }
      const meRam = memoryRam.length !== memoryRamSlotQuantity ? [...memoryRam, ...Array(memoryRamSlotQuantity - memoryRam.length).fill(0)] : memoryRam

      if (memoryRamCapacity > 0 && memoryRam.length !== memoryRamSlotQuantity) {
        meRam[0] = Number(memoryRamCapacity)
      }
      setPreloadedDeviceState(prev => ({ ...prev, computerName, processorId, memoryRamType, memoryRamSlotQuantity, memoryRam: meRam, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, operatingSystemId, macAddress, ipAddress }))
    }
    if (hardDrive !== null) {
      const { health, hardDriveCapacityId, hardDriveTypeId } = hardDrive
      setPreloadedDeviceState(prev => ({ ...prev, health, hardDriveCapacityId, hardDriveTypeId }))
    }
  }

  return {
    preloadedDeviceState,
    setResetState,
    isAddForm
  }
}
