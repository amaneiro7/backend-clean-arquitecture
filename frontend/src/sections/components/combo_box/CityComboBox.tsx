import { lazy, Suspense, useMemo } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";
import { useCity } from "../../Hooks/locations/useCity";

interface Props {
    value?: string
    state?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"));

export function CityComboBox({ value, state, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { cities, loading } = useCity(repository)

    const initialValue = useMemo(() => {
        return cities.find(city => city.id === value)
    }, [cities, value])

    const filtered = useMemo(() => {
        if (!state) return cities
        return cities.filter(city => city.stateId === state)
    }, [cities, state])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='cityId'
                initialValue={initialValue}
                label="Ciudad"
                name='cityId'
                type={type}
                onChange={(_, newValue) => {
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