import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveType } from './useHardDriveType'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: number | null | ''
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const HardDriveTypeSelect: FC<Props> = ({ value, onChange, isRequired }) => {
  const { repository } = useAppContext()
  const { hardDriveType } = useHardDriveType(repository)
  return (
        <Suspense>
            <Select
                label='Tipo de Disco Duro'
                name='hardDriveTypeId'
                onChange={onChange}
                options={hardDriveType}
                placeholder='-- Filtre por Tipo de Disco --'
                isHidden={false}
                isDisabled={false}
                isRequired={isRequired}
                value={value === '' || value === 0 || value === null || value === undefined ? '' : value}
            />
        </Suspense>
  )
}

export default HardDriveTypeSelect
