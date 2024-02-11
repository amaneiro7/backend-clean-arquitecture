import { type ChangeEvent, type FC } from 'react'
import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'

import HealthInput from './HealthInput'
import { HardDrive } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { type HardDriveProps } from '../../../../modules/devices/devices/devices/application/DeviceCreator'

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  formData: HardDriveProps
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
