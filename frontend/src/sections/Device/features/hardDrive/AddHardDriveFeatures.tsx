import { type FC } from 'react'
import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'
import HealthInput from './HealthInput'
import { HardDrive, type HardDrivePrimitives } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
interface Props {
  onChange: OnHandleChange
  formData: HardDrivePrimitives
}

const AddHardDriveFeatures: FC<Props> = ({ formData, onChange }) => {
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
              isRequired={true}
            />
            <HardDriveTypeSelect
              onChange={onChange}
              value={formData.hardDriveTypeId}
              isRequired={true}
            />
          </div>
        </>
        : null}
    </>
  )
}
export default AddHardDriveFeatures
