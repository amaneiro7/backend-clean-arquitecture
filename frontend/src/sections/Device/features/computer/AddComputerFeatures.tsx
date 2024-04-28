import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Computer, type ComputerPrimitives } from '../../../../modules/devices/fetures/computer/domain/Computer'
import { InputSkeletonLoading } from '../../../components/Loading/inputSkeletonLoading'
import MemoryRamCapacityInput from '../memoryRam/MemoryRamCapacityInput'


import IpAddressInput from './ipAddressInput'
import MacAddressInput from './MacAddressInput'
import ComputerNameInput from './ComputerNameInput'

interface Props {
  onChange: OnHandleChange
  formData: ComputerPrimitives
}

const ProcessorComboBox = lazy(async () => import('../../../components/combo_box/ProcessorComboBox'))
const HardDriveCapacityComboBox = lazy(async () => import('../../../components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const OperatingSystemComboBox = lazy(async () => import('../../../components/combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(async () => import('../../../components/combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('../../../components/combo_box/HardDriveTypeComboBox'))

export default function AddComputerFeatures({ formData, onChange }: Props) {
  const isComputerLaptopAllinOneDevice = Computer.isComputerCategory({ categoryId: formData.categoryId })

  return (
    <>
      {isComputerLaptopAllinOneDevice &&
        <>
          <ComputerNameInput
            isForm={true}
            onChange={onChange}
            status={formData.statusId}
            value={formData.computerName}
          />
          <Suspense fallback={<InputSkeletonLoading />}>
            <ProcessorComboBox
              type='form'
              onChange={onChange}
              value={formData.processorId}
            />
          </Suspense>
          <MemoryRamCapacityInput
            onChange={onChange}
            value={formData.memoryRamCapacity}
          />
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
            <IpAddressInput
              onChange={onChange}
              value={formData.ipAddress}
              status={formData.statusId}
              isForm={true}
            />
            <MacAddressInput
              onChange={onChange}
              value={formData.macAddress}
              isRequired={false}
            />
          </div>
        </>
      }
    </>
  )
}
