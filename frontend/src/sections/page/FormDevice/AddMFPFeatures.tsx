import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { MFP, MFPPrimitives } from '../../../modules/devices/fetures/multiFunctionalPrinter/MFP'
interface Props {
    onChange: OnHandleChange
    formData: MFPPrimitives
}

const IpAddressInput = lazy(async () => import('../../components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput })))
export default function AddMFPFeatures({ formData, onChange }: Props) {
  const isMFPDevice = MFP.isMFPCategory({ categoryId: formData.categoryId })

  return (
    <>
      {isMFPDevice &&
        <>
          <Suspense fallback={<InputSkeletonLoading />}>
            <IpAddressInput
              onChange={onChange}
              value={formData.ipAddress}
              status={formData.statusId}
              type='form'
            />
          </Suspense>          
        </>
      }
    </>
  )
}
