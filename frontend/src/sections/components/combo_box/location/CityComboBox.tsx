import { lazy, Suspense, useMemo } from "react";
import { OnHandleChange } from "../../../../modules/shared/domain/types/types";
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators";
import { InputSkeletonLoading } from "../../skeleton/inputSkeletonLoading";
import { useCity } from "../../../Hooks/locations/useCity";
import { type CityPrimitives } from "../../../../modules/location/city/domain/city";
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives";
import { type StateId } from "../../../../modules/location/state/domain/StateId";
import { type CityId } from "../../../../modules/location/city/domain/CityId";

interface Props {
    value?: Primitives<CityId>
    state?: Primitives<StateId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("../combo_box"));

export function CityComboBox({ value, state, onChange, type = 'search' }: Props) {
    const { cities, loading } = useCity()

    const initialValue = useMemo(() => {
        return cities.find(city => city.id === value)
    }, [cities, value])

    const filtered = useMemo(() => {
        if (!state) return cities
        return cities.filter(city => city.stateId === state)
    }, [cities, state])

    console.log(cities)

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='cityId'
                initialValue={initialValue}
                label="Ciudad"
                name='cityId'
                type={type}
                onChange={(_, newValue: CityPrimitives) => {
                    onChange('cityId', newValue ? newValue.id : '', Operator.EQUAL)
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