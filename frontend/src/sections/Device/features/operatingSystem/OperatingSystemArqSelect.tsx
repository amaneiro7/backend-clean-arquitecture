import { type FC, lazy, Suspense } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemArq } from './useOperatingSystemArq'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type OperatingSystemArqId } from '../../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<OperatingSystemArqId>
  onChange: OnHandleChange
  isRequired?: boolean
}

const OperatingSystemArqSelect: FC<Props> = ({ value, onChange, isRequired }) => {
  const { repository } = useAppContext()
  const { operatingSystemArq } = useOperatingSystemArq(repository)
  return (
    <Suspense>
      <Select
        label='Arquitectura del Sistema Operativo'
        name='operatingSystemArqId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={operatingSystemArq}
        placeholder='-- Filtre Arquitectura del Sistema Operativo --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}

export default OperatingSystemArqSelect
