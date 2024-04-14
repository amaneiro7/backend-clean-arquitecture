import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { useAppContext } from '../../../Context/AppContext'
import { type GerenciaId } from '../../../../modules/employee/area/gerencia/domain/GerenciaId'
import { type VicepresidenciaId } from '../../../../modules/employee/area/vicepresidencia/domain/VicepresidenciaId'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<GerenciaId>
  vicepresidenciaId: Primitives<VicepresidenciaId>
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

export default function GerenciaSelect ({ value, onChange, isRequired, vicepresidenciaId }: Props) {
  const { gerencia: { gerencia } } = useAppContext()

  const gerenciaFiltered = gerencia.filter((gerencia) => gerencia.vicepresidenciaId === vicepresidenciaId)

  return (
    <Suspense>
      <Select
        label='gerencia'
        name='gerenciaId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={gerenciaFiltered}
        placeholder='-- Filtre por gerencia --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}
