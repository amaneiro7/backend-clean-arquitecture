import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'
import { BatteryModel } from '../../../modules/devices/model/ModelCharacteristics/modelLaptop/BatteryModel'

interface Props {
    value: Primitives<BatteryModel>
    onChange: OnHandleChange
    type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))

export function BatteryModelInput({ value = '', onChange, type = 'form' }: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    useLayoutEffect(() => {
        if (type !== 'form') return

        if (isFirstInput.current || !value) {
            isFirstInput.current = value.length !== BatteryModel.NAME_MIN_LENGTH
            return
        }

        const isValid = BatteryModel.isValid(value)

        setIsError(!isValid)
        setErrorMessage(isValid ? '' : BatteryModel.invalidMessage(value))

        return () => {
            setErrorMessage('')
            setIsError(false)
        }
    }, [value])
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <FormInput
                id='batteryModel'
                isRequired={type !== 'search'}
                name="batteryModel"
                type="text"
                label='Numero de Modelo de Bateria'
                placeholder=''
                handle={(event) => {
                    const { name, value } = event.target
                    onChange(name, value, Operator.CONTAINS)
                }}                
                value={value}
                isError={isError}
                errorMessage={errorMessage}
            />
        </Suspense>
    )
}
