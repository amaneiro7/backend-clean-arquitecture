import { type FC, lazy, Suspense } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemVersions } from './useOperatingSystemVersion'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OperatingSystemId } from '../../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<OperatingSystemId>
  onChange: OnHandleChange
  isRequired?: boolean
}

const OperatingSystemVersionSelect: FC<Props> = ({ value, onChange, isRequired }) => {
  const { repository } = useAppContext()
  const { operatingSystem } = useOperatingSystemVersions(repository)
  return (
    <Suspense>
      <Select
        label='Sistemas Operativo'
        name='operatingSystemId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={operatingSystem}
        placeholder='-- Filtre por Sistema Operativo --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}

export default OperatingSystemVersionSelect
