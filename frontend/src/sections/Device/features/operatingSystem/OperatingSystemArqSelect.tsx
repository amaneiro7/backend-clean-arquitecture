import { type ChangeEvent, type FC, lazy, Suspense } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemArq } from './useOperatingSystemArq'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const OperatingSystemArqSelect: FC<Props> = ({ value, onChange }) => {
  const { repository } = useAppContext()
  const { operatingSystemArq } = useOperatingSystemArq(repository)
  return (
    <Suspense>
      <Select
        label='Arquitectura del Sistema Operativo'
        name='operatingSystemArqId'
        onChange={onChange}
        options={operatingSystemArq}
        placeholder='-- Filtre Arquitectura del Sistema Operativo --'
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}

export default OperatingSystemArqSelect
