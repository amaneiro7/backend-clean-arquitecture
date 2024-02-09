import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveCapacity } from './useHardDriveCapacity'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const HardDriveCapacitySelect: FC<Props> = ({ value, onChange }) => {
  const { repository } = useAppContext()
  const { hardDriveCapacity } = useHardDriveCapacity(repository)
  console.log(hardDriveCapacity)

  return (
        <Suspense>
            <Select
                 label='Capacidad de Disco Duro'
                 name='hardDriveCapacityId'
                 onChange={onChange}
                 options={hardDriveCapacity}
                 placeholder='-- Filtre por Tamaño de Disco --'
                 isHidden={false}
                 isDisabled={false}
                 value={value}
            />
        </Suspense>
  )
}

export default HardDriveCapacitySelect
