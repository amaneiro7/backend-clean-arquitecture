import { getValueFromQueryParams } from '../../utils/getValueFromQueryParams'
import { createFilterFromQueryParams } from '../../utils/createFilterFromQueryParams'
import { CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type CityId } from '../../../modules/location/city/domain/CityId'
import { type StateId } from '../../../modules/location/state/domain/StateId'
import { type RegionId } from '../../../modules/location/region/domain/RegionId'
import { type DeviceEmployee } from '../../../modules/devices/devices/devices/domain/DeviceEmployee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export interface InputData {
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    statusId: Primitives<StatusId>
    activo: Primitives<DeviceActivo>
    serial: Primitives<DeviceSerial>
    modelId: Primitives<ModelId>
    employeeId: Primitives<DeviceEmployee>
    locationId: Primitives<LocationId>
    typeOfSiteId: Primitives<TypeOfSiteId>
    cityId: Primitives<CityId>
    stateId: Primitives<StateId>
    regionId: Primitives<RegionId>
}

export const defaultInputData = {
    categoryId: '',
    brandId: '',
    statusId: '',
    activo: '',
    serial: '',
    modelId: '',
    employeeId: '',
    locationId: '',
    typeOfSiteId: '',
    cityId: '',
    stateId: '',
    regionId: '',
}
export function defaultInitialInputValue(defaultCategoryQuery: SearchByCriteriaQuery): {
    inputData: InputData,
    query: SearchByCriteriaQuery
} {

    const { serial, activo, categoryId, ...resParams } = getValueFromQueryParams(defaultInputData)

    const resFilters = createFilterFromQueryParams(resParams)

    const filters = [
        serial && { field: 'serial', operator: Operator.CONTAINS, value: serial },
        activo && { field: 'activo', operator: Operator.CONTAINS, value: activo },
        ...resFilters,
        ...(categoryId ? [{ field: 'categoryId', operator: Operator.EQUAL, value: categoryId }] : defaultCategoryQuery.filters),
    ].filter(Boolean)

    return {
        inputData: { ...defaultInputData, serial, activo, categoryId, ...resParams },
        query: { filters },
    }

}