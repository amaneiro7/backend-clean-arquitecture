import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputSkeletonLoading } from '../Loading/inputSkeletonLoading'
import { ProcessorFrequency } from '../../../modules/devices/fetures/processor/domain/ProcessorFrequency'

interface Props {
    value: number
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const NumberInput = lazy(async () => await import('./NumberInput').then(m => ({ default: m.NumberInput })))

export default function ProcessorFrequencyInput({ value, onChange, type = 'form' }: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    useEffect(() => {
        if (type === 'search') return

        if (isFirstInput.current) {
            isFirstInput.current = value === 0
            return
        }

        const isValid = ProcessorFrequency.isValid(value)

        setIsError(!isValid)
        setErrorMessage(isValid ? '' : ProcessorFrequency.invalidMessage(value))

        return () => {
            setErrorMessage('')
            setIsError(false)
        }
    }, [value])
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <NumberInput
                name='frequency'
                label='Frecuencia'
                onChange={(event) => {
                    const { name, value } = event.target
                    onChange(name, value)
                }}
                placeholder='--- Ingrese la frecuencia del procesador ---'
                value={value}
                isRequired={type === 'form'}
                max={ProcessorFrequency.MAX}
                min={ProcessorFrequency.MIN}
                error={isError}
                errorMessage={errorMessage}
            />
        </Suspense>
    )
}

