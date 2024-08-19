import { lazy, Suspense, useMemo } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { DefaultProps } from '../../Hooks/device/DeviceFormInitialState'

interface Props {
  onChange: OnHandleChange
  formData: DefaultProps
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

export default function AddComputerFeatures({ formData, onChange }: Props) {
  const isComputerLaptopAllinOneDevice = Computer.isComputerCategory({ categoryId: formData.categoryId })

  const renderInputs = useMemo(() => {    
    if (formData.memoryRam && formData.memoryRam?.length === formData.memoryRamSlotQuantity) {
      return formData.memoryRam
    }
    const inputs = new Array(formData.memoryRamSlotQuantity).fill(0)
    formData.memoryRam = inputs
    return inputs
  }, [formData.memoryRamSlotQuantity])


  return (
    <>
      {(isComputerLaptopAllinOneDevice && renderInputs) &&
        <>          
          <Suspense fallback={<InputSkeletonLoading />}>
            <ComputerNameInput
              type='form'
              onChange={onChange}
              status={formData.statusId}
              value={formData.computerName}
            />
          </Suspense>
          <Suspense fallback={<InputSkeletonLoading />}>
            <IpAddressInput
              onChange={onChange}
              value={formData.ipAddress}
              status={formData.statusId}
              type='form'
            />
          </Suspense>
          <Suspense fallback={<InputSkeletonLoading />}>
            <ProcessorComboBox
              type='form'
              onChange={onChange}
              value={formData.processorId}
            />
          </Suspense>
          <div className='flex gap-4 md:col-span-2 row-span-2'>
            {
              renderInputs.map((_, index) => (
                <MemoryRamCapacitySlotInput
                  key={index}
                  index={index}
                  type='form'
                  onChange={onChange}
                  value={formData.memoryRam}
                  status={formData.statusId}
                />
              ))
            }
            <Suspense fallback={<InputSkeletonLoading />}>
              <MemoryRamCapacityInput
                onChange={onChange}
                value={formData.memoryRamCapacity}
                memoryRam={formData.memoryRam}
                status={formData.statusId}
                type='form'
              />
            </Suspense>
            <Suspense>
              <ReadOnlyInputBox
                label='Tipo de Memoria'
                value={formData.memoryRamType}
              />
            </Suspense>
          </div>
          <div className='grid md:grid-cols-3 gap-4'>
            <div className='col-span-2'>
              <Suspense fallback={<InputSkeletonLoading />}>
                <HardDriveCapacityComboBox
                  onChange={onChange}
                  value={formData.hardDriveCapacityId}
                  status={formData.statusId}
                  type='form'
                />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<InputSkeletonLoading />}>
                <HardDriveTypeComboBox
                  onChange={onChange}
                  value={formData.hardDriveTypeId}
                  hardDriveCapacity={formData.hardDriveCapacityId}
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
                  value={formData.operatingSystemId}
                  status={formData.statusId}
                  hardDriveCapacity={formData.hardDriveCapacityId}
                  type='form'
                />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<InputSkeletonLoading />}>
                <OperatingSystemArqComboBox
                  onChange={onChange}
                  value={formData.operatingSystemArqId}
                  operatingSystem={formData.operatingSystemId}
                  type='form'
                />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<InputSkeletonLoading />}>
            <MacAddressInput
              onChange={onChange}
              value={formData.macAddress}
              isRequired={false}
            />
          </Suspense>
          
        </>}
    </>
  )
}
