import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveCapacity } from './useHardDriveCapacity'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type HardDriveCapacityId } from '../../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: Primitives<HardDriveCapacityId>
  onChange: OnHandleChange
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
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value)
                 }}
                 options={hardDriveCapacity}
                 placeholder='-- Filtre por Tamaño de Disco --'
                 isHidden={false}
                 isRequired={isRequired}
                 isDisabled={false}
                 value={value}
            />
        </Suspense>
  )
}

export default HardDriveCapacitySelect
