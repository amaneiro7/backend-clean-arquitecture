import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { useSite } from "../../../Hooks/locations/useSite"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type SiteId } from "../../../../modules/location/site/domain/SiteId"
import { type SitePrimitives } from "../../../../modules/location/site/domain/site"
import { type CityId } from "../../../../modules/location/city/domain/CityId"


interface Props {
    value?: Primitives<SiteId>
    city?: Primitives<CityId>
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("../combo_box"))
const ReadOnlyInputBox = lazy(async () => import('../../ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export function SiteComboBox({ value, city, onChange, type = 'search', isAddForm = false }: Props) {
    const { sites, loading } = useSite()

    const initialValue = useMemo(() => {
        return sites.find(site => site.id === value)
    }, [sites, value])

    const filtered = useMemo(() => {
        if (!city) return sites
        return sites.filter(site => site.cityId === city)
    }, [sites, city])

    return (
        <Suspense>
            {!isAddForm && type === 'form'
                ? <ReadOnlyInputBox label="Sitio" value={initialValue?.name} />
                : <ComboBox
                    id='siteId'
                    initialValue={initialValue}
                    label="Sitio"
                    name='siteId'
                    type={type}
                    onChange={(_, newValue: SitePrimitives) => {
                        onChange('siteId', newValue ? newValue.id : '', Operator.EQUAL)
                        onChange('siteName', newValue ? newValue.name : '', Operator.EQUAL)
                    }}
                    options={filtered}
                    isDisabled={false}
                    isRequired={type === 'form'}
                    loading={loading}
                >
                </ComboBox>
            }
        </Suspense>
    )
}