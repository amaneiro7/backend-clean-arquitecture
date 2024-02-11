import { type ChangeEvent, type FC, lazy, Suspense } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemVersions } from './useOperatingSystemVersion'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const OperatingSystemVersionSelect: FC<Props> = ({ value = 0, onChange }) => {
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
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}

export default OperatingSystemVersionSelect
