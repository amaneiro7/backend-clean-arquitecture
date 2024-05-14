import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { useCountryStates } from "../../Hooks/locations/useCountryStates"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"

interface Props {
    value?: string

    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function StateComboBox({ value, onChange, type = 'search' }: Props) {
    const { state, loading } = useCountryStates()

    const initialValue = useMemo(() => {
        return state.find(sta => sta.id === value)
    }, [state, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='stateId'
                initialValue={initialValue}
                label="Estado"
                name='stateId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('stateId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={state}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}