import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"

import { Primitives } from "../../../../modules/shared/domain/value-object/Primitives"

import { useCountryStates } from "../../../Hooks/locations/useCountryStates"
import { StateId } from "../../../../modules/location/state/domain/StateId"

interface Props {
    value?: Primitives<StateId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("../combo_box"))

export function StateComboBox({ value, onChange, type = 'search' }: Props) {
    const { state, loading } = useCountryStates()

    const initialValue = useMemo(() => {
        return state.find(st => st.id === value)
    }, [state, value])

    return (
        <Suspense>
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