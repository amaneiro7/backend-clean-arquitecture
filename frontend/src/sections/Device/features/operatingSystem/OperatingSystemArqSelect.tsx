import { type ChangeEvent, type FC, lazy, Suspense } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemArq } from './useOperatingSystemArq'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | null | ''
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
        onChange={onChange}
        options={operatingSystemArq}
        placeholder='-- Filtre Arquitectura del Sistema Operativo --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value === '' || value === 0 || value === null || value === undefined ? '' : value}
      />
    </Suspense>
  )
}

export default OperatingSystemArqSelect
