import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import ProcessorSelect from '../processor/ProcessorSelect'
import MemoryRamCapacityInput from '../memoryRam/MemoryRamCapacityInput'
import HardDriveCapacitySelect from '../hardDrive/HardDriveCapacitySelect'
import HardDriveTypeSelect from '../hardDrive/HardDriveTypeSelect'
import OperatingSystemArqSelect from '../operatingSystem/OperatingSystemArqSelect'
import OperatingSystemVersionSelect from '../operatingSystem/OperatingSystemVersionSelect'
import { Computer, type ComputerPrimitives } from '../../../../modules/devices/fetures/computer/domain/Computer'
import IpAddressInput from './ipAddressInput'
import MacAddressInput from './MacAddressInput'
import ComputerNameInput from './ComputerNameInput'

interface Props {
  onChange: OnHandleChange
  formData: ComputerPrimitives
}

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
          <ProcessorSelect
            isForm={true}
            onChange={onChange}
            value={formData.processorId}
            isRequired={false}
          />
          <MemoryRamCapacityInput
            onChange={onChange}
            value={formData.memoryRamCapacity}
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
          <div className='flex gap-4'>
            <OperatingSystemVersionSelect
              onChange={onChange}
              value={formData.operatingSystemId}
              isForm
              status={formData.statusId}
              hardDriveCapacity={formData.hardDriveCapacityId}
            />
            <OperatingSystemArqSelect
              onChange={onChange}
              value={formData.operatingSystemArqId}
              isForm
              operatingSystem={formData.operatingSystemId}
            />
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
