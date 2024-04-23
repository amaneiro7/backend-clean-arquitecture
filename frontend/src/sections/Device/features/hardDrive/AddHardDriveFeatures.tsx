import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'
import HealthInput from './HealthInput'
import { HardDrive, type HardDrivePrimitives } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
interface Props {
  onChange: OnHandleChange
  formData: HardDrivePrimitives
}

export default function AddHardDriveFeatures ({ formData, onChange }: Props) {
  const isHardDriveDevice = HardDrive.isHardDriveCategory({ categoryId: formData.categoryId })

  return (
    <>
      {isHardDriveDevice
        ? <>
          <HealthInput
            onChange={onChange}
            value={formData.health}
            isRequired={true}
          />
          <div className='flex gap-4'>
            <HardDriveCapacitySelect
              onChange={onChange}
              value={formData.hardDriveCapacityId}
              isForm
              status={formData.statusId}
            />
            <HardDriveTypeSelect
              onChange={onChange}
              value={formData.hardDriveTypeId}
              isForm
              hardDriveCapacity={formData.hardDriveCapacityId}
            />
          </div>
        </>
        : null}
    </>
  )
}
