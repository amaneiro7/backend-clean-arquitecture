import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type InputData } from './useInputData'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))

interface Props {
    inputData: InputData
    handleChange: OnHandleChange
}

export function FilterSection({ inputData, handleChange }: Props) {
    return (
        <Suspense>
            <HeaderInput>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <EmployeeComboBox
                        name='employeeId'
                        value={inputData.employeeId}
                        onChange={handleChange}
                    />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <CategoryComboBox
                        value={inputData.categoryId}
                        onChange={handleChange}
                    />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <SerialInput
                        value={inputData.serial}
                        onChange={handleChange}
                    />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <LocationComboBox
                        value={inputData.locationId}
                        typeOfSiteId={TypeOfSiteId.SitesOptions.ADMINISTRATIVE}
                        statusId={StatusId.StatusOptions.INUSE}
                        onChange={handleChange}
                        type='search'
                    />
                </Suspense>
            </HeaderInput>
        </Suspense>
    )

}