import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { lazy, Suspense } from 'react'

interface Props {
  formData: any
  onChange: OnHandleChange
}
const AddComputerFeatures = lazy(async () => await import('../../features/computer/AddComputerFeatures'))
const AddHardDriveFeatures = lazy(async () => await import('../../features/hardDrive/AddHardDriveFeatures'))

export default function DeviceFeatures({ onChange, formData }: Props) {
  return (
    <>
      <Suspense>
        <AddHardDriveFeatures formData={formData} onChange={onChange} />
      </Suspense>
      <Suspense>
        <AddComputerFeatures formData={formData} onChange={onChange} />
      </Suspense>
    </>
  )
}
