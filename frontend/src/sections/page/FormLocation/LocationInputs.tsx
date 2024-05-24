import { lazy, Suspense } from "react"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type DefaultLocationProps } from "../../Hooks/locations/useLocationInitialState"

interface Props {
    formData: DefaultLocationProps
    onChange: OnHandleChange
    isAddForm: boolean
}

const TypeOfSiteComboBox = lazy(async () => import('../../components/combo_box/TypeOfSiteComboBox').then(m => ({ default: m.TypeOfSiteComboBox })))
const SiteComboBox = lazy(async () => import('../../components/combo_box/location/SiteComboBox').then(m => ({ default: m.SiteComboBox })))
const RegionComboBox = lazy(async () => import('../../components/combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))
const StateComboBox = lazy(async () => import('../../components/combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))
const CityComboBox = lazy(async () => import('../../components/combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
const SubnetInput = lazy(async () => import('../../components/text-inputs/location/SubnetInput').then(m => ({ default: m.SubnetInput })))
const LocationNameInput = lazy(async () => import('../../components/text-inputs/location/LocationNameInput').then(m => ({ default: m.LocationNameInput })))

export function LocationInputs({ onChange, formData, isAddForm }: Props) {
    return (
        <>
            <Suspense fallback={<InputSkeletonLoading />}>
                <TypeOfSiteComboBox
                    isAddForm={isAddForm}
                    onChange={onChange}
                    value={formData.typeOfSiteId}
                    type='form'
                />
            </Suspense>
            <div className="flex gap-4">
                <Suspense fallback={<InputSkeletonLoading />}>
                    <RegionComboBox
                        isAddForm={isAddForm}
                        onChange={onChange}
                        type='form'
                        value={formData.regionId}
                    />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <StateComboBox
                        isAddForm={isAddForm}
                        onChange={onChange}
                        type='form'
                        value={formData.stateId}
                        region={formData.regionId}
                    />
                </Suspense>
            </div>
            <div className="flex gap-4">
                <Suspense fallback={<InputSkeletonLoading />}>
                    <CityComboBox
                        isAddForm={isAddForm}
                        onChange={onChange}
                        type='form'
                        value={formData.cityId}
                        state={formData.stateId}
                    />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <SiteComboBox
                        isAddForm={isAddForm}
                        onChange={onChange}
                        type='form'
                        value={formData.siteId}
                        city={formData.cityId}
                    />
                </Suspense>
            </div>
            <div className="flex gap-4">
                <Suspense fallback={<InputSkeletonLoading />}>
                    <LocationNameInput
                        onChange={onChange}
                        value={formData.name}
                        siteName={formData.siteName}
                        typeOfSite={formData.typeOfSiteId}
                        type='form'
                        isAddForm={isAddForm}
                    />
                </Suspense>
            </div>

            <Suspense fallback={<InputSkeletonLoading />}>
                <SubnetInput
                    onChange={onChange}
                    value={formData.subnet}
                    type='form'
                />
            </Suspense>
        </>
    )
}