import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { useCountryStates } from "../../../Hooks/locations/useCountryStates"
import { InputSkeletonLoading } from "../../skeleton/inputSkeletonLoading"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { type StatePrimitives } from "../../../../modules/location/state/domain/state"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type StateId } from "../../../../modules/location/state/domain/StateId"
import { type RegionId } from "../../../../modules/location/region/domain/RegionId"


interface Props {
    value?: Primitives<StateId>
    region?: Primitives<RegionId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./../combo_box"))

export function StateComboBox({ value, region, onChange, type = 'search' }: Props) {
    const { state, loading } = useCountryStates()

    const initialValue = useMemo(() => {
        return state.find(sta => sta.id === value)
    }, [state, value])

    const filtered = useMemo(()=> {
        if (!region) return state
        return state.filter(sta => sta.regionId === region)
    }, [state, region])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='stateId'
                initialValue={initialValue}
                label="Estado"
                name='stateId'
                type={type}
                onChange={(_, newValue: StatePrimitives) => {
                    onChange('stateId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={filtered}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}