import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

const HeaderInput = lazy(async () => import('../HeaderInput').then(m => ({ default: m.HeaderInput })))
const FilterContainer = lazy(async () => import('../FilterContainer').then(m => ({ default: m.FilterContainer })))
const EmployeeComboBox = lazy(async () => await import('../combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../combo_box/LocationComboBox'))
const StatusComboBox = lazy(async () => await import('../combo_box/StatusComboBox'))
const BrandComboBox = lazy(async () => await import('../combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('../combo_box/ModelComboBox'))
const CityComboBox = lazy(async () => await import('../combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
const StateComboBox = lazy(async () => await import('../combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))
const RegionComboBox = lazy(async () => await import('../combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))
const SerialInput = lazy(async () => await import('../text-inputs/SerialInput'))
const ActivoInput = lazy(async () => import('../text-inputs/ActivoInput'))

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputData: any
    handleChange: OnHandleChange
    open: boolean
    handleOpenFIlterSidebar: () => void
}

export function FilterSection({ inputData, open, handleChange, handleOpenFIlterSidebar }: Props) {    
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
          </FilterContainer>
        </HeaderInput>
      </Suspense>
    )

}