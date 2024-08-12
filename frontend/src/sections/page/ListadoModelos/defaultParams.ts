import { useMemo } from 'react'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'


export interface InputData {
    id: Primitives<ModelId>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
}

export function useDefaultInitialInputValue(): {
    inputData: InputData,
    defaultInputData: InputData
} {

    const defaultInputData = useMemo(() => {
        return {
            id: '',
            categoryId: '',
            brandId: '',
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