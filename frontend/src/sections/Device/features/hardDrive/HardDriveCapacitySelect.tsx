import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveCapacity } from './useHardDriveCapacity'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | null | ''
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const HardDriveCapacitySelect: FC<Props> = ({ value, onChange, isRequired }) => {
  const { repository } = useAppContext()
  const { hardDriveCapacity } = useHardDriveCapacity(repository)

  return (
        <Suspense>
            <Select
                 label='Capacidad de Disco Duro'
                 name='hardDriveCapacityId'
                 onChange={onChange}
                 options={hardDriveCapacity}
                 placeholder='-- Filtre por Tamaño de Disco --'
                 isHidden={false}
                 isRequired={isRequired}
                 isDisabled={false}
                 value={value === '' || value === 0 || value === null || value === undefined ? '' : value}
            />
        </Suspense>
  )
}

export default HardDriveCapacitySelect
