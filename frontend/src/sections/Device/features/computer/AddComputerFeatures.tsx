import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Computer, type ComputerPrimitives } from '../../../../modules/devices/fetures/computer/domain/Computer'
import { InputSkeletonLoading } from '../../../components/skeleton/inputSkeletonLoading'
import MacAddressInput from '../../../components/text-inputs/MacAddressInput'

interface Props {
  onChange: OnHandleChange
  formData: ComputerPrimitives
}

const ComputerNameInput = lazy(async () => import('../../../components/text-inputs/ComputerNameInput').then(m => ({ default: m.ComputerNameInput })))
const ProcessorComboBox = lazy(async () => import('../../../components/combo_box/ProcessorComboBox'))
const MemoryRamCapacityInput = lazy(async () => import('../../../components/number-inputs/MemoryRamCapacityInput').then(m => ({ default: m.MemoryRamCapacityInput })))
const OperatingSystemComboBox = lazy(async () => import('../../../components/combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(async () => import('../../../components/combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))
const HardDriveCapacityComboBox = lazy(async () => import('../../../components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('../../../components/combo_box/HardDriveTypeComboBox'))
const IpAddressInput = lazy(async () => import('../../../components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput })))

export default function AddComputerFeatures({ formData, onChange }: Props) {
  const isComputerLaptopAllinOneDevice = Computer.isComputerCategory({ categoryId: formData.categoryId })

  return (
    <>
      {isComputerLaptopAllinOneDevice &&
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
            <ProcessorComboBox
              type='form'
              onChange={onChange}
              value={formData.processorId}
            />
          </Suspense>
          <Suspense fallback={<InputSkeletonLoading />}>
            <MemoryRamCapacityInput
              onChange={onChange}
              value={formData.memoryRamCapacity}
              status={formData.statusId}
              type='form'
            />
          </Suspense>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <HardDriveCapacityComboBox
                onChange={onChange}
                value={formData.hardDriveCapacityId}
                status={formData.statusId}
                type='form'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <HardDriveTypeComboBox
                onChange={onChange}
                value={formData.hardDriveTypeId}
                hardDriveCapacity={formData.hardDriveCapacityId}
                type='form'
              />
            </Suspense>
          </div>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <OperatingSystemComboBox
                onChange={onChange}
                value={formData.operatingSystemId}
                status={formData.statusId}
                hardDriveCapacity={formData.hardDriveCapacityId}
                type='form'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <OperatingSystemArqComboBox
                onChange={onChange}
                value={formData.operatingSystemArqId}
                operatingSystem={formData.operatingSystemId}
                type='form'
              />
            </Suspense>
          </div>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <IpAddressInput
                onChange={onChange}
                value={formData.ipAddress}
                status={formData.statusId}
                type='form'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <MacAddressInput
                onChange={onChange}
                value={formData.macAddress}
                isRequired={false}
              />
            </Suspense>
          </div>
        </>
      }
    </>
  )
}
