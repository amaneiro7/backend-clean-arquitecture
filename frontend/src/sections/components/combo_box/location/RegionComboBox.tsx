import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { useRegion } from "../../../Hooks/locations/useRegion"
import { RegionId } from "../../../../modules/location/region/domain/RegionId"
import { RegionPrimitives } from "../../../../modules/location/region/domain/region"

interface Props {
    value?: Primitives<RegionId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("../combo_box"))

export function RegionComboBox({ value, onChange, type = 'search' }: Props) {
    const { regions, loading } = useRegion()

    const initialValue = useMemo(() => {
        return regions.find(region => region.id === value)
    }, [regions, value])

    return (
        <Suspense>
            <ComboBox
                id='regionId'
                initialValue={initialValue}
                label="Región"
                name='regionId'
                type={type}
                onChange={(_, newValue: RegionPrimitives) => {
                    onChange('regionId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={regions}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}