import { FC } from 'react'
import AddComputerFeatures from '../features/computer/AddComputerFeatures'
import AddHardDriveFeatures from '../features/hardDrive/AddHardDriveFeatures'

interface Props {
  formData
  onChange:
}

export const DeviceFeatures: FC<Props> = ({ onChange, formData }) => {
  return (
    <>
        <AddComputerFeatures formData={formData} onChange={onChange} />
        <AddHardDriveFeatures formData={formData} onChange={onChange}/>
    </>
  )
}
