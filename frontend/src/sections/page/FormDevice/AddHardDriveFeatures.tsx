import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type HardDriveHealth } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type HardDriveCapacityId } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type HardDriveTypeId } from '../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
interface Props {
  onChange: OnHandleChange
  health: Primitives<HardDriveHealth>
  statusId: Primitives<StatusId>
  hardDriveCapacityId: Primitives<HardDriveCapacityId>
  hardDriveTypeId: Primitives<HardDriveTypeId>  
  
}

const HardDriveCapacityComboBox = lazy(async () => import('../../components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('../../components/combo_box/HardDriveTypeComboBox'))
const HealthInput = lazy(async () => await import('../../components/number-inputs/HealthInput').then(m => ({ default: m.HealthInput })))

export default function AddHardDriveFeatures({ 
  statusId, 
  hardDriveCapacityId,
  hardDriveTypeId,
  health,
  onChange 
}: Props) {
  return (
    <>
      <Suspense fallback={<InputSkeletonLoading />}>
        <HealthInput
          onChange={onChange}
          value={health}
          isRequired
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <HardDriveCapacityComboBox
          onChange={onChange}
          value={hardDriveCapacityId}
          type='form'
          status={statusId}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <HardDriveTypeComboBox
          onChange={onChange}
          value={hardDriveTypeId}
          type='form'
          hardDriveCapacity={hardDriveCapacityId}
        />
      </Suspense>
    </>
  )
}
