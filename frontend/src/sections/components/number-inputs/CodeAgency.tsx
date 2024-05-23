import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: number
  onChange: OnHandleChange
}

const NumberInput = lazy(async () => await import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function CodeAgencyInput({ value, onChange }: Props) {
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='codeAgency'
        label='Codigo'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        placeholder='--- Código de la agencia ---'
        value={value}
        isRequired
        max={550}
        min={1}        
      />
    </Suspense>
  )
}
