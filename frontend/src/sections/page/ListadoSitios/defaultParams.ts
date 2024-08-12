import { useMemo } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StateId } from '../../../modules/location/state/domain/StateId'
import { type CityId } from '../../../modules/location/city/domain/CityId'
import { type TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type RegionId } from '../../../modules/location/region/domain/RegionId'
import { type LocationName } from '../../../modules/location/locations/domain/LocationName'

export interface InputData {
    name: Primitives<LocationName>
    regionId: Primitives<RegionId>
    stateId: Primitives<StateId>
    cityId: Primitives<CityId>
    typeOfSiteId: Primitives<TypeOfSiteId>
}

export function useDefaultInitialInputValue(): {
    inputData: InputData,
    defaultInputData: InputData
} {

    const defaultInputData = useMemo(() => {
        return {
            name: '',
            regionId: '',
            stateId: '',
            cityId: '',
            typeOfSiteId: ''
        }
    }, [])

    const getValuesFromQueryParams = useMemo(async () => {
        return await import('../../utils/getValueFromQueryParams').then(m => m.getValueFromQueryParams(defaultInputData))
    }, [defaultInputData])

    return {
        defaultInputData,
        inputData: { ...defaultInputData, ...getValuesFromQueryParams }
    }
}