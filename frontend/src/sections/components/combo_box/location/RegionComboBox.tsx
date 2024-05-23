import { lazy, Suspense, useMemo } from "react"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { useRegion } from "../../../Hooks/locations/useRegion"
import { type OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type RegionId } from "../../../../modules/location/region/domain/RegionId"
import { type RegionPrimitives } from "../../../../modules/location/region/domain/region"


interface Props {
    value?: Primitives<RegionId>
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("../combo_box"))
const ReadOnlyInputBox = lazy(async () => import('../../ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export function RegionComboBox({ value, onChange, type = 'search', isAddForm = false }: Props) {
    const { regions, loading } = useRegion()

    const initialValue = useMemo(() => {
        return regions.find(region => region.id === value)
    }, [regions, value])

    return (
        <Suspense>
            {
                !isAddForm && type === 'form'
                    ? <ReadOnlyInputBox label='Región' required defaultValue={initialValue?.name} />
                    : <ComboBox
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
            }
        </Suspense>
    )
}