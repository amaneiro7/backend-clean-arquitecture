import { lazy } from 'react'

import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputData } from './defaultParams'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'

const ComputerNameInput = lazy(() => import('../../components/text-inputs/ComputerNameInput').then(m => ({ default: m.ComputerNameInput})))
const ProcessorInput = lazy(() => import('../../components/text-inputs/ProcessorInput').then(m => ({ default: m.ProcessorInput})))
const IpAddressInput = lazy(() => import('../../components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput})))
const HeaderInput = lazy(() => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const FilterContainer = lazy(() => import('../../components/FilterContainer').then(m => ({ default: m.FilterContainer })))
const EmployeeComboBox = lazy(() => import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(() => import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(() => import('../../components/combo_box/LocationComboBox'))
const StatusComboBox = lazy(() => import('../../components/combo_box/StatusComboBox'))
const BrandComboBox = lazy(() => import('../../components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(() => import('../../components/combo_box/ModelComboBox'))
const CityComboBox = lazy(() => import('../../components/combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
const StateComboBox = lazy(() => import('../../components/combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))
const RegionComboBox = lazy(() => import('../../components/combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))
const OperatingSystemComboBox = lazy(() => import('../../components/combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(() => import('../../components/combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))
const SerialInput = lazy(() => import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(() => import('../../components/text-inputs/ActivoInput'))

interface Props {
    inputData: InputData
    handleChange: OnHandleChange
    open: boolean
    handleOpenFIlterSidebar: () => void
    filterCategory?: Primitives<CategoryId>[]
}

export function FilterSection({ inputData, filterCategory, open, handleChange, handleOpenFIlterSidebar }: Props) {    
    return (      
      <HeaderInput>
        <EmployeeComboBox
          name='employeeId'
          value={inputData.employeeId}
          onChange={handleChange}
        />
        <CategoryComboBox
          value={inputData.categoryId}
          onChange={handleChange}
          filter={filterCategory}
        />
        <SerialInput
          value={inputData.serial}
          onChange={handleChange}
        />
        <LocationComboBox
          value={inputData.locationId}
          onChange={handleChange}
          type='search'
        />
        <RegionComboBox
          value={inputData.regionId}
          onChange={handleChange}
          type='search'
        />
        <FilterContainer open={open} handleClick={handleOpenFIlterSidebar}>
          <ActivoInput
            value={inputData.activo}
            onChange={handleChange}
          />
          <StatusComboBox
            value={inputData.statusId}
            onChange={handleChange}
            type='search'
          />
          <BrandComboBox
            value={inputData.brandId}
            onChange={handleChange}
            type='search'
          />
          <ModelComboBox
            value={inputData.modelId}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
            type='search'
          />
          <StateComboBox
            value={inputData.stateId}
            region={inputData.regionId}
            onChange={handleChange}
            type='search'
          />
          <ComputerNameInput 
            onChange={handleChange}
            type='search'
            value={inputData.computerName}
          />
          <CityComboBox
            value={inputData.cityId}
            state={inputData.stateId}
            onChange={handleChange}
            type='search'
          />
          <OperatingSystemComboBox
            value={inputData.operatingSystemId}
            onChange={handleChange}
            type='search'
          />
          <OperatingSystemArqComboBox
            value={inputData.operatingSystemArqId}
            onChange={handleChange}
            type='search'
          />
          <ProcessorInput onChange={handleChange} value={inputData.processor} />
          <IpAddressInput 
            onChange={handleChange}
            value={inputData.ipAddress}
            type='search'
          />
        </FilterContainer>
      </HeaderInput>      
    )

}