import { Suspense, lazy } from 'react'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { SelectChangeEvent } from '@mui/material';

const Select = lazy(async () => await import('./Select'))

interface Props {
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void
}

export function FilterOperator({ onChange }: Props) {
  const operatorArray = Object.keys(Operator).map(key => ({ id: Operator[key], name: key }))

  return (
    <Suspense>
      <Select
        label='Operador'
        name='operator'
        defaultValue={Operator.CONTAINS}
        placeholder='Selecciona el operador'
        onChange={onChange}
        options={operatorArray}
        isHidden={true}
        isDisabled={false}
      />
    </Suspense>
  )
}
