import { lazy } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

interface Props {
  formData: any
  onChange: OnHandleChange
}
const AddComputerFeatures = lazy(async () => await import('./AddComputerFeatures'))
const AddHardDriveFeatures = lazy(async () => await import('./AddHardDriveFeatures'))
const AddMFPFeatures = lazy(async () => await import('./AddMFPFeatures'))

export default function DeviceFeatures({ onChange, formData }: Props) {
  return (
    <>
      <AddHardDriveFeatures formData={formData} onChange={onChange} />
      <AddComputerFeatures formData={formData} onChange={onChange} />
      <AddMFPFeatures formData={formData} onChange={onChange} />
    </>
  )
}
