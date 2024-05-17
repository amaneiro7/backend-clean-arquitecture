import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { useSite } from "../../../Hooks/locations/useSite"
import { Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { SiteId } from "../../../../modules/location/site/domain/SiteId"

interface Props {
    value?: Primitives<SiteId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("../combo_box"))

export function SiteComboBox({ value, onChange, type = 'search' }: Props) {
    const { sites, loading } = useSite()

    const initialValue = useMemo(() => {
        return sites.find(site => site.id === value)
    }, [sites, value])

    return (
        <Suspense>
            <ComboBox
                id='siteId'
                initialValue={initialValue}
                label="Sitio"
                name='siteId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('siteId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={sites}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}