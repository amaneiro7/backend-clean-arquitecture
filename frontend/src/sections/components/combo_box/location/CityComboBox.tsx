import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { useCity } from "../../../Hooks/locations/useCity"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./../combo_box"))

export function CityComboBox({ value, onChange, type = 'search' }: Props) {
    const { cities, loading } = useCity()

    const initialValue = useMemo(() => {
        return cities.find(city => city.id === value)
    }, [cities, value])

    return (
        <Suspense>
            <ComboBox
                id='cityId'
                initialValue={initialValue}
                label="Ciudad"
                name='cityId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('cityId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={cities}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}