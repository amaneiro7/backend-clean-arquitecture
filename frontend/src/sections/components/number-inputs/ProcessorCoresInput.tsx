import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { ProcessorCores } from '../../../modules/devices/fetures/processor/domain/ProcessorCores'
import { OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { InputSkeletonLoading } from '../Loading/inputSkeletonLoading'

interface Props {
    value: Primitives<ProcessorCores>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const NumberInput = lazy(async () => await import('../../ui/number-field'))

export default function ProcessorCoresInput({ value, onChange, type = 'form' }: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    useEffect(() => {
        if (type === 'search') return

        if (isFirstInput.current) {
            isFirstInput.current = value === 0
            return
        }

        const isValid = ProcessorCores.isValid(value)

        setIsError(!isValid)
        setErrorMessage(isValid ? '' : ProcessorCores.invalidMessage(value))

        return () => {
            setErrorMessage('')
            setIsError(false)
        }
    }, [value])
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <NumberInput
                name='cores'
                label='Cores'
                onChange={(event) => {
                    const { name, value } = event.target
                    onChange(name, value)
                }}
                placeholder='--- Ingrese el número de nucleos ---'
                value={value}
                isRequired={type === 'form'}
                max={ProcessorCores.MAX}
                min={ProcessorCores.MIN}
                error={isError}
                errorMessage={errorMessage}
            />
        </Suspense>
    )
}

