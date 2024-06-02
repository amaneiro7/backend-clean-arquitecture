import { lazy, Suspense, useState } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { type InputData } from './useInputData'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { useNavigate } from 'react-router-dom'

const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const FilterContainer = lazy(async () => import('../../components/FilterContainer').then(m => ({ default: m.FilterContainer })))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const StatusComboBox = lazy(async () => await import('../../components/combo_box/StatusComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const CityComboBox = lazy(async () => await import('../../components/combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
const StateComboBox = lazy(async () => await import('../../components/combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))
const RegionComboBox = lazy(async () => await import('../../components/combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))
const OperatingSystemComboBox = lazy(async () => await import('../../components/combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(async () => await import('../../components/combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))
const ProcessorComboBox = lazy(async () => await import('../../components/combo_box/ProcessorComboBox'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const FilterButon = lazy(async () => import('../../components/button/FilterButton').then(m => ({ default: m.FilterButon })))
const ActivoInput = lazy(async () => import('../../components/text-inputs/ActivoInput'))
const Button = lazy(async () => await import('../../components/button'))

interface Props {
    inputData: InputData
    handleChange: OnHandleChange
    handleClear: () => void
}

export function FilterSection({ inputData, handleClear, handleChange }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleOpenFIlterSidebar = () => {
        setOpen(!open)
    }
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
                        onChange={handleChange}
                        type='search'
                    />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                    <RegionComboBox
                        value={inputData.regionId}
                        onChange={handleChange}
                        type='search'
                    />
                </Suspense>
                <div className='flex gap-4'>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <Button
                            actionType='CLOSE'
                            type='button'
                            text='Limpiar'
                            handle={handleClear}
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <Button
                            type='button'
                            text='Añadir'
                            actionType='ACTION'
                            handle={() => { navigate('/device/add') }}
                        />
                    </Suspense>
                </div>

                <FilterButon onClick={handleOpenFIlterSidebar} />
                <FilterContainer open={open} handleClick={handleOpenFIlterSidebar}>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <ActivoInput
                            value={inputData.activo}
                            onChange={handleChange}
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <StatusComboBox
                            value={inputData.statusId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <BrandComboBox
                            value={inputData.locationId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <ModelComboBox
                            value={inputData.modelId}
                            brandId={inputData.brandId}
                            categoryId={inputData.categoryId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <StateComboBox
                            value={inputData.stateId}
                            region={inputData.regionId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <CityComboBox
                            value={inputData.cityId}
                            state={inputData.stateId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <OperatingSystemComboBox
                            value={inputData.operatingSystemId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <OperatingSystemArqComboBox
                            value={inputData.operatingSystemArqId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                    <Suspense fallback={<InputSkeletonLoading />}>
                        <ProcessorComboBox
                            value={inputData.processorId}
                            onChange={handleChange}
                            type='search'
                        />
                    </Suspense>
                </FilterContainer>
            </HeaderInput>
        </Suspense>
    )

}