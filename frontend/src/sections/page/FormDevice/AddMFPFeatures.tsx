import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
interface Props {
    onChange: OnHandleChange
    statusId: Primitives<StatusId>
    ipAddress: Primitives<IPAddress>
}

const IpAddressInput = lazy(async () => import('../../components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput })))
export default function AddMFPFeatures({ ipAddress, statusId, onChange }: Props) {
  return (
    <>
      <Suspense fallback={<InputSkeletonLoading />}>
        <IpAddressInput
          onChange={onChange}
          value={ipAddress}
          status={statusId}
          type='form'
        />
      </Suspense>          
      
    </>
  )
}
