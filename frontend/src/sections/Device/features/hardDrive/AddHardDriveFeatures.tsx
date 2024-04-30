import { HardDrive, type HardDrivePrimitives } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../../components/skeleton/inputSkeletonLoading'
interface Props {
  onChange: OnHandleChange
  formData: HardDrivePrimitives
}

const HardDriveCapacitySelect = lazy(async () => await import('../../../components/Select/HardDriveCapacitySelect'))
const HardDriveTypeSelect = lazy(async () => await import('../../../components/Select/HardDriveTypeSelect'))
const HealthInput = lazy(async () => await import('../../../components/number-inputs/HealthInput').then(m => ({ default: m.HealthInput })))

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
              isRequired={true}
            />
          </Suspense>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <HardDriveCapacitySelect
                onChange={onChange}
                value={formData.hardDriveCapacityId}
                isForm
                status={formData.statusId}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <HardDriveTypeSelect
                onChange={onChange}
                value={formData.hardDriveTypeId}
                isForm
                hardDriveCapacity={formData.hardDriveCapacityId}
              />
            </Suspense>
          </div>
        </>
      }
    </>
  )
}
