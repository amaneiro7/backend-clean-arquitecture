import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../ui/Select'))

interface Props {
  value: Primitives<StatusId>
  onChange: OnHandleChange
  isRequired?: boolean
}

const StatusSelect: FC<Props> = ({ value, onChange, isRequired = false }) => {
  const { status: { status } } = useAppContext()
  return (
        <Suspense>
            <Select
                 label='Estado'
                 name='statusId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={status}
                 placeholder='-- Filtre por Estado --'
                 isHidden={false}
                 isDisabled={false}
                 value={value}
                 defaultValue={value}
                 isRequired={isRequired}
            />
        </Suspense>
  )
}

export default StatusSelect
