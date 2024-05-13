import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { CartridgeModel } from '../../../modules/devices/model/ModelCharacteristics/modelPrinter/CartridgeModel'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'


interface Props {
    value: Primitives<CartridgeModel>
    onChange: OnHandleChange
    type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))

export function CartridgeModelInput({ value, onChange, type = 'form' }: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    useLayoutEffect(() => {
        if (type !== 'form' || value === undefined) return

        if (isFirstInput.current || !value) {
            isFirstInput.current = value?.length !== CartridgeModel.NAME_MIN_LENGTH
            return
        }

        const isValid = CartridgeModel.isValid(value)

        setIsError(!isValid)
        setErrorMessage(isValid ? '' : CartridgeModel.invalidMessage(value))

        return () => {
            setErrorMessage('')
            setIsError(false)
        }
    }, [value])
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <FormInput
                id='cartridgeModel'
                isRequired={type !== 'search'}
                name="cartridgeModel"
                type="text"
                label='Numero de Modelo del cartucho'
                placeholder=''
                handle={(event) => {
                    const { name, value } = event.target
                    onChange(name, value)
                }}                
                value={value}
                isError={isError}
                errorMessage={errorMessage}
            />
        </Suspense>
    )
}
