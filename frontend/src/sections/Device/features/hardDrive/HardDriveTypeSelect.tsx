import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveType } from './useHardDriveType'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type HardDriveTypeId } from '../../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: Primitives<HardDriveTypeId>
  onChange: OnHandleChange
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
                onChange={(event) => {
                  const { name, value } = event.target
                  onChange(name, value)
                }}
                options={hardDriveType}
                placeholder='-- Filtre por Tipo de Disco --'
                isHidden={false}
                isDisabled={false}
                isRequired={isRequired}
                value={value}
            />
        </Suspense>
  )
}

export default HardDriveTypeSelect
