import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { InputSkeletonLoading } from '../../skeleton/inputSkeletonLoading'

import { LocationName } from '../../../../modules/location/locations/domain/LocationName'

interface Props {
    value: Primitives<LocationName>
    onChange: OnHandleChange
    type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./../FormInput').then(m => ({ default: m.FormInput })))

export function LocationNameInput({ value = '', onChange, type = 'form' }: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    useLayoutEffect(() => {
        if (type !== 'form') return

        if (isFirstInput.current || !value) {
            isFirstInput.current = value.length !== LocationName.NAME_MIN_LENGTH
            return
        }

        const isValid = LocationName.isValid(value)

        setIsError(!isValid)
        setErrorMessage(isValid ? '' : LocationName.invalidMessage())

        return () => {
            setErrorMessage('')
            setIsError(false)
        }
    }, [value])
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <FormInput
                id='name'
                isRequired={type !== 'search'}
                name="name"
                type="text"
                label='Nombre del sitio'
                placeholder='-- Ingrese el nombre del sitio --'
                handle={(event) => {
                    let { name, value } = event.target
                    value = value.trim().toUpperCase()
                    onChange(name, value, Operator.CONTAINS)
                }}
                value={value}
                isError={isError}
                errorMessage={errorMessage}
            />
        </Suspense>
    )
}
