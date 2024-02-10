import ProcessorSelect from '../processor/ProcessorSelect'
import { CategoryDefaultData } from '../../../../modules/devices/category/domain/CategoryDefaultData'
import { type FC } from 'react'
import MemoryRamCapacityInput from '../memoryRam/MemoryRamCapacityInput'
import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'
import OperatingSystemArqSelect from '../operatingSystem/OperatingSystemArqSelect'
import OperatingSystemVersionSelect from '../operatingSystem/OperatingSystemVersionSelect'

interface Props {
  onChange
  formData
}

const AddComputerFeatures: FC<Props> = ({ formData, onChange }) => {
  const isComputerLaptopAllinOneDevice = ['Computadoras', 'Servidores', 'Laptops', 'All in One'].includes(CategoryDefaultData[formData.categoryId])

  return (
    <>
      {isComputerLaptopAllinOneDevice
        ? <>
          <ProcessorSelect
            isForm={true}
            onChange={onChange}
            value={formData.processorId}
          />
          <MemoryRamCapacityInput
            onChange={onChange}
            value={formData.memoryRamCapacity}
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
          <div className='flex gap-4'>
            <OperatingSystemArqSelect
              onChange={onChange}
              value={formData.processorId}
            />
            <OperatingSystemVersionSelect
              onChange={onChange}
              value={formData.processorId}
            />
          </div>
        </>
        : null}
    </>
  )
}
export default AddComputerFeatures
