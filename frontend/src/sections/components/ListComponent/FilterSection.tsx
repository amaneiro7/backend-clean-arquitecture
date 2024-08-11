import { lazy } from 'react'
import { useDeviceContext } from '../../Context/DeviceProvider'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type InputData } from '../../page/ListWrapper/ListComputer/defaultParams'


const HeaderInput = lazy(() => import('../HeaderInput').then(m => ({ default: m.HeaderInput })))
const Input = lazy(() => import('../text-inputs/Input').then(m => ({ default: m.Input })))
const FilterContainer = lazy(() => import('../FilterContainer/FilterContainer').then(m => ({ default: m.FilterContainer })))
const EmployeeComboBox = lazy(() => import('../combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(() => import('../combo_box/CategoryComboBox'))
const LocationComboBox = lazy(() => import('../combo_box/LocationComboBox'))
const RegionComboBox = lazy(() => import('../combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))

interface Props {
    inputData: InputData
    handleChange: OnHandleChange
    children: React.ReactElement<typeof FilterContainer>
}

export function FilterSection({ inputData, handleChange, children }: Props) {    
  const { defaultCategoryList } = useDeviceContext()
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
          filter={defaultCategoryList}
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
        {children}
      </HeaderInput>      
    )

}