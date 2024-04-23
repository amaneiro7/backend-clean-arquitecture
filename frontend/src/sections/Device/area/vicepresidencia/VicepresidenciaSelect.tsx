import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { useAppContext } from '../../../Context/AppContext'
import { type VicepresidenciaId } from '../../../../modules/employee/area/vicepresidencia/domain/VicepresidenciaId'
import { type VicepresidenciaEjecutivaId } from '../../../../modules/employee/area/vicepresidenciaejecutiva/domain/VicepresidenciaEjecutivaId'
import { useVicepresidencia } from './useVicepresidencia'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<VicepresidenciaId>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

export default function VicepresidenciaSelect ({ value, onChange, isRequired, vicepresidenciaEjecutivaId }: Props) {
  const { repository } = useAppContext()
  const { vicepresidencia } = useVicepresidencia(repository)

  const vicepresidenciaFiltered = vicepresidencia.filter((vicepresidencia) => vicepresidencia.vicepresidenciaEjecutivaId === vicepresidenciaEjecutivaId)

  return (
    <Suspense>
      <Select
        label='vicepresidencia'
        name='vicepresidenciaId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={vicepresidenciaFiltered}
        placeholder='-- Filtre por vicepresidencia --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}
