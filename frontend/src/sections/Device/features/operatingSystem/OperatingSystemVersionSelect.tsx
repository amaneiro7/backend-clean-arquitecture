import { type ChangeEvent, type FC, lazy, Suspense } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemVersions } from './useOperatingSystemVersion'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | null | ''
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
        onChange={onChange}
        options={operatingSystem}
        placeholder='-- Filtre por Sistema Operativo --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value === '' || value === 0 || value === null || value === undefined ? '' : value}
      />
    </Suspense>
  )
}

export default OperatingSystemVersionSelect
