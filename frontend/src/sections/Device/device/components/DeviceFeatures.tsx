import { type FC } from 'react'
import AddComputerFeatures from '../../features/computer/AddComputerFeatures'
import AddHardDriveFeatures from '../../features/hardDrive/AddHardDriveFeatures'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'

interface Props {
  formData: any
  onChange: OnHandleChange
}

const DeviceFeatures: FC<Props> = ({ onChange, formData }) => {
  return (
    <>
        <AddComputerFeatures formData={formData} onChange={onChange} />
        <AddHardDriveFeatures formData={formData} onChange={onChange}/>
    </>
  )
}

export default DeviceFeatures
