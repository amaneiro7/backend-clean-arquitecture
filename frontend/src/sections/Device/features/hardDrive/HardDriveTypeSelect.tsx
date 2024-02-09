import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveType } from './useHardDriveType'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const HardDriveTypeSelect: FC<Props> = ({ value, onChange }) => {
  const { repository } = useAppContext()
  const { hardDriveType } = useHardDriveType(repository)
  return (
        <Suspense>
            <Select
                label='Capacidad de Disco Duro'
                name='hardDriveTypeId'
                onChange={onChange}
                options={hardDriveType}
                placeholder='-- Filtre por Tamaño de Disco --'
                isHidden={false}
                isDisabled={false}
                value={value}
            />
        </Suspense>
  )
}

export default HardDriveTypeSelect
