import { lazy, Suspense, useMemo } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type ComputerName } from '../../../modules/devices/fetures/computer/domain/ComputerName'
import { type IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
import { type ProcessorId } from '../../../modules/devices/fetures/processor/domain/ProcessorId'
import { type MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { type MemoryRamCapacity } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { type MACAddress } from '../../../modules/devices/fetures/computer/domain/MACAddress'
import { type OperatingSystemId } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqId } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type HardDriveTypeId } from '../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type HardDriveCapacityId } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type MemoryRamTypeName } from '../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeName'
import { type MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'

interface Props {
  onChange: OnHandleChange
  handleMemory: (value: string, index: number) => void
  statusId: Primitives<StatusId>
  computerName: Primitives<ComputerName>
  processorId: Primitives<ProcessorId>
  memoryRam?: Primitives<MemoryRamValues>[]
  memoryRamCapacity: Primitives<MemoryRamCapacity>  
  memoryRamSlotQuantity?: Primitives<MemoryRamSlotQuantity>
  memoryRamType?: Primitives<MemoryRamTypeName>
  hardDriveCapacityId?: Primitives<HardDriveCapacityId>
  hardDriveTypeId?: Primitives<HardDriveTypeId>
  operatingSystemArqId?: Primitives<OperatingSystemArqId>
  operatingSystemId?: Primitives<OperatingSystemId>
  ipAddress: Primitives<IPAddress>
  macAddress?: Primitives<MACAddress>
}

const ComputerNameInput = lazy(async () => import('../../components/text-inputs/ComputerNameInput').then(m => ({ default: m.ComputerNameInput })))
const ProcessorComboBox = lazy(async () => import('../../components/combo_box/ProcessorComboBox'))
const MemoryRamCapacityInput = lazy(async () => import('../../components/number-inputs/MemoryRamCapacityInput').then(m => ({ default: m.MemoryRamCapacityInput })))
const OperatingSystemComboBox = lazy(async () => import('../../components/combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(async () => import('../../components/combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))
const HardDriveCapacityComboBox = lazy(async () => import('../../components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('../../components/combo_box/HardDriveTypeComboBox'))
const MacAddressInput = lazy(async () => import('../../components/text-inputs/MacAddressInput'))
const IpAddressInput = lazy(async () => import('../../components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput })))
const MemoryRamCapacitySlotInput = lazy(async () => import('../../components/number-inputs/MemoryRamCapacitySlotInput').then(m => ({ default: m.MemoryRamCapacitySlotInput })))
const ReadOnlyInputBox = lazy(async () => import('../../components/ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export default function AddComputerFeatures({ 
  statusId,
  computerName,
  ipAddress,
  processorId,
  memoryRam,
  memoryRamCapacity,  
  memoryRamType,
  hardDriveCapacityId,
  hardDriveTypeId,
  memoryRamSlotQuantity,
  operatingSystemId,
  operatingSystemArqId,
  macAddress,
  onChange, 
  handleMemory 
}: Props) {
  
  const renderInputs = useMemo(() => {    
    if (memoryRam && memoryRam?.length === memoryRamSlotQuantity) {
      return memoryRam
    }
    const inputs = new Array(memoryRamSlotQuantity).fill(0)
    memoryRam = inputs
    return inputs
  }, [memoryRamSlotQuantity])


  return (
    <>
      <Suspense fallback={<InputSkeletonLoading />}>
        <ComputerNameInput
          type='form'
          onChange={onChange}
          status={statusId}
          value={computerName}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <IpAddressInput
          onChange={onChange}
          value={ipAddress}
          status={statusId}
          type='form'
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <ProcessorComboBox
          type='form'
          onChange={onChange}
          value={processorId}
        />
      </Suspense>
      <div className='grid grid-cols-2 gap-4 md:col-span-2'>
        <div className='grid grid-cols-2 gap-4'>
          {renderInputs.length > 0 ?
          renderInputs?.map((_, index) => (
            <MemoryRamCapacitySlotInput
              key={`memRam-${index}`}
              index={index}
              type='form'
              onChange={handleMemory}
              value={memoryRam[index]}
              status={statusId}
            />
        )) : null}

        </div>
        <div className='flex gap-4'>
          <Suspense fallback={<InputSkeletonLoading />}>
            <MemoryRamCapacityInput
              onChange={onChange}
              value={memoryRamCapacity}
              memoryRam={memoryRam}
              status={statusId}
              type='form'
            />
          </Suspense>
          <Suspense>
            <ReadOnlyInputBox
              label='Tipo de Memoria'
              value={memoryRamType}
            />
          </Suspense>

        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <Suspense fallback={<InputSkeletonLoading />}>
            <HardDriveCapacityComboBox
              onChange={onChange}
              value={hardDriveCapacityId}
              status={statusId}
              type='form'
            />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<InputSkeletonLoading />}>
            <HardDriveTypeComboBox
              onChange={onChange}
              value={hardDriveTypeId}
              hardDriveCapacity={hardDriveCapacityId}
              type='form'
            />
          </Suspense>
        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <Suspense fallback={<InputSkeletonLoading />}>
            <OperatingSystemComboBox
              onChange={onChange}
              value={operatingSystemId}
              status={statusId}
              hardDriveCapacity={hardDriveCapacityId}
              type='form'
            />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<InputSkeletonLoading />}>
            <OperatingSystemArqComboBox
              onChange={onChange}
              value={operatingSystemArqId}
              operatingSystem={operatingSystemId}
              type='form'
            />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<InputSkeletonLoading />}>
        <MacAddressInput
          onChange={onChange}
          value={macAddress}
          isRequired={false}
        />
      </Suspense>
    </>
  )
}
