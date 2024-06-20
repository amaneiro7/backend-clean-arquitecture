import { HardDrive, type HardDrivePrimitives } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
interface Props {
  onChange: OnHandleChange
  formData: HardDrivePrimitives
}

const HardDriveCapacityComboBox = lazy(async () => import('../../components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('../../components/combo_box/HardDriveTypeComboBox'))
const HealthInput = lazy(async () => await import('../../components/number-inputs/HealthInput').then(m => ({ default: m.HealthInput })))

export default function AddHardDriveFeatures({ formData, onChange }: Props) {
  const isHardDriveDevice = HardDrive.isHardDriveCategory({ categoryId: formData.categoryId })

  return (
    <>
      {isHardDriveDevice &&
        <>
          <Suspense fallback={<InputSkeletonLoading />}>
            <HealthInput
              onChange={onChange}
              value={formData.health}
              isRequired
            />
          </Suspense>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <HardDriveCapacityComboBox
                onChange={onChange}
                value={formData.hardDriveCapacityId}
                type='form'
                status={formData.statusId}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <HardDriveTypeComboBox
                onChange={onChange}
                value={formData.hardDriveTypeId}
                type='form'
                hardDriveCapacity={formData.hardDriveCapacityId}
              />
            </Suspense>
          </div>
        </>}
    </>
  )
}
