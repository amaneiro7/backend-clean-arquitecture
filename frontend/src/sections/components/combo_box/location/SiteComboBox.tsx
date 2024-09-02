import { lazy, Suspense, useMemo } from "react"
import { useAppContext } from "../../../Context/AppProvider"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { type OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type SiteId } from "../../../../modules/location/site/domain/SiteId"
import { type SitePrimitives } from "../../../../modules/location/site/domain/site"
import { type CityId } from "../../../../modules/location/city/domain/CityId"


interface Props {
    value?: Primitives<SiteId>
    city?: Primitives<CityId>
    onChange?: OnHandleChange
    handleSite?: (value: string, siteName: string) => void
    isAddForm?: boolean
    type?: 'form' | 'search'
    error?: string
    disabled?: boolean
    required?: boolean
}

const ComboBox = lazy(async () => import("../combo_box"))
const ReadOnlyInputBox = lazy(async () => import('@/sections/components/ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export function SiteComboBox({ value, city, onChange, handleSite, type = 'search', isAddForm = false, error, required, disabled = false }: Props) {
    const { useSite: { sites, loading }} = useAppContext()
    
    const filtered = useMemo(() => {
        if (!city) return sites
        return sites.filter(site => site.cityId === city)
    }, [sites, city])
    
    const initialValue = useMemo(() => {
        return filtered.find(site => site.id === value)
    }, [filtered, value])

    return (
      <Suspense>
        {!isAddForm && type === 'form'
            ? <ReadOnlyInputBox label='Sitio' value={initialValue?.name} />
            : <ComboBox
                id='siteId'
                initialValue={initialValue}
                label='Sitio'
                name='siteId'
                type={type}
                onChange={(_, newValue: SitePrimitives) => {
                    const value = newValue ? newValue.id : ''
                    if (onChange) {
                        onChange('siteId',value , Operator.EQUAL)
                    }
                    if (handleSite) {
                        const siteName = newValue ? newValue.name : ''
                        handleSite(value, siteName)
                    }
                    
                }}
                options={filtered}
                isDisabled={disabled}
                isRequired={required}
                isError={!!error}
                errorMessage={error}
                loading={loading}
              />}
      </Suspense>
    )
}