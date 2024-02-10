import { type FC } from 'react'
import { CategoryDefaultData } from '../../../../modules/devices/category/domain/CategoryDefaultData'
import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'

import HealthInput from './HealthInput'

interface Props {
  onChange
  formData
}

const AddHardDriveFeatures: FC<Props> = ({ formData, onChange }) => {
  const isHardDriveDevice = ['Discos Duros'].includes(CategoryDefaultData[formData.categoryId])

  return (
    <>
      {isHardDriveDevice
        ? <>
          <HealthInput
            onChange={onChange}
            value={formData.health}
          />
          <div className='flex gap-4'>
            <HardDriveCapacitySelect
              onChange={onChange}
              value={formData.hardDriveCapacityId}
            />
            <HardDriveTypeSelect
              onChange={onChange}
              value={formData.hardDriveTypeId}
            />
          </div>
        </>
        : null}
    </>
  )
}
export default AddHardDriveFeatures
