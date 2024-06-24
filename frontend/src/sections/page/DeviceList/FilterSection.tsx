import { lazy } from 'react'

import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputData } from './defaultParams'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'


const HeaderInput = lazy(() => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Input = lazy(() => import('../../components/text-inputs/Input').then(m => ({ default: m.Input })))
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
        <Input
          value={inputData.serial}
          name='serial'
          type='text'
          label='Serial'
          onChange={(event) => {
            let { value } = event.target
            const { name } = event.target
            value = value.trim().toUpperCase()            
            handleChange(name, value, Operator.CONTAINS)
          }}
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
          <Input
            value={inputData.activo}
            name='activo'
            type='text'
            label='Activo'
            onChange={(event) => {
              let { value } = event.target
              const { name } = event.target
              value = value.trim().toUpperCase()            
              handleChange(name, value, Operator.CONTAINS)
            }}
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
          <Input
            value={inputData.computerName}
            name='computerName'
            type='text'
            label='Nombre del equipo'
            onChange={(event) => {
              let { value } = event.target
              const { name } = event.target
              value = value.trim().toUpperCase()            
              handleChange(name, value, Operator.CONTAINS)
            }}
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
          <Input
            value={inputData.processor}
            name='processor'
            type='text'
            label='Procesador'
            onChange={(event) => {
              let { value } = event.target
              const { name } = event.target
              value = value.trim().toUpperCase()            
              handleChange(name, value, Operator.CONTAINS)
            }}
          />
          <Input
            value={inputData.ipAddress}
            name='ipAddress'
            type='text'
            label='Dirección IP'
            onChange={(event) => {
              let { value } = event.target
              const { name } = event.target
              value = value.trim().toUpperCase()            
              handleChange(name, value, Operator.CONTAINS)
            }}
          />
        </FilterContainer>
      </HeaderInput>      
    )

}