import { type ChangeEvent, type FC, lazy, Suspense } from 'react'
import { useMemoryRamType } from './useMemoryRamType'
import { useAppContext } from '../../../Context/AppContext'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const MemoryRamTypeSelect: FC<Props> = ({ value, onChange, isRequired }) => {
  const { repository } = useAppContext()
  const { memoryRamTypes } = useMemoryRamType(repository)
  return (
    <Suspense>
      <Select
        label='Typo de Memoria'
        name='memoryRamTypeId'
        onChange={onChange}
        options={memoryRamTypes}
        placeholder='-- Filtre por Tipo de Memoria --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}

export default MemoryRamTypeSelect
