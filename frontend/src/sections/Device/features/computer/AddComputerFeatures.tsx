import ProcessorSelect from '../processor/ProcessorSelect'
import { type ChangeEvent, type FC } from 'react'
import MemoryRamCapacityInput from '../memoryRam/MemoryRamCapacityInput'
import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'
import OperatingSystemArqSelect from '../operatingSystem/OperatingSystemArqSelect'
import OperatingSystemVersionSelect from '../operatingSystem/OperatingSystemVersionSelect'
import { Computer, type ComputerPrimitives } from '../../../../modules/devices/fetures/computer/domain/Computer'
import IpAddressInput from './ipAddressInput'
import MacAddressInput from './MacAddressInput'

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  formData: ComputerPrimitives
}

const AddComputerFeatures: FC<Props> = ({ formData, onChange }) => {
  const isComputerLaptopAllinOneDevice = Computer.isComputerCategory({ categoryId: formData.categoryId })

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
              value={formData.operatingSystemArqId}
            />
            <OperatingSystemVersionSelect
              onChange={onChange}
              value={formData.operatingSystemId}
              />
          </div>
          <div className='flex gap-4'>
          <IpAddressInput
              onChange={onChange}
              value={formData.ipAddress}
              isForm={true}
          />
          <MacAddressInput
              onChange={onChange}
              value={formData.macAddress}
              isForm={true}
          />
          </div>
        </>
        : null}
    </>
  )
}
export default AddComputerFeatures
