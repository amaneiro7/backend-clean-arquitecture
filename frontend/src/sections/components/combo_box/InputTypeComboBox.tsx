import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { useInputType } from "../../Hooks/inputType/useInputType"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function InputTypeComboBox({ value, onChange, type = 'search' }: Props) {
    const { inputType, loading } = useInputType()

    const initialValue = useMemo(() => {
        return inputType.find(input => input.id === value)
    }, [inputType, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='inputTypeId'
                initialValue={initialValue}
                label="Tipo de Entrada"
                name='inputTypeId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('inputTypeId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={inputType}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}