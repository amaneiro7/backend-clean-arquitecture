import { Suspense, lazy } from 'react'

import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputData } from './useInputData'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'

const HeaderInput = lazy(() => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const CategoryComboBox = lazy(() => import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(() => import('../../components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(() => import('../../components/combo_box/ModelComboBox'))


interface Props {
    inputData: InputData
    handleChange: OnHandleChange
}

export function FilterSection({ inputData, handleChange }: Props) {    
    return (      
      <HeaderInput>
        <Suspense fallback={<InputSkeletonLoading />}>
          <CategoryComboBox
            value={inputData.categoryId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandComboBox
            value={inputData.brandId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ModelComboBox
            name='id'
            value={inputData.id}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
          />
        </Suspense>
        
      </HeaderInput>      
    )
}