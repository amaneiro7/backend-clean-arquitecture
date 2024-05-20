import { lazy, Suspense } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"

interface Props {
    formData: any
    onChange: OnHandleChange
}

const TypeOfSiteComboBox = lazy(async () => import('../../components/combo_box/TypeOfSiteComboBox').then(m => ({ default: m.TypeOfSiteComboBox })))
const SiteComboBox = lazy(async () => import('../../components/combo_box/location/SiteComboBox').then(m => ({ default: m.SiteComboBox })))
const SubnetInput = lazy(async () => import('../../components/text-inputs/location/SubnetInput').then(m => ({ default: m.SubnetInput })))
const LocationNameInput = lazy(async () => import('../../components/text-inputs/location/LocationNameInput').then(m => ({ default: m.LocationNameInput })))

export function LocationInputs({ onChange, formData }: Props) {
    return (
        <>
            <Suspense>
                <TypeOfSiteComboBox
                    onChange={onChange}
                    value={formData.typeOfSiteId}
                    type='form'
                />
            </Suspense>
            <Suspense>
                <SiteComboBox
                    onChange={onChange}
                    type='form'
                    value={formData.siteId}
                />

            </Suspense>
            <Suspense>
                <SubnetInput
                    onChange={onChange}
                    value={formData.subnet}
                    type='form'
                />
            </Suspense>
            <Suspense>
                <LocationNameInput
                    onChange={onChange}
                    value={formData.name}
                    type='form'
                />
            </Suspense>
        </>
    )
}