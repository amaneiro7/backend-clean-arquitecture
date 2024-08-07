import { lazy, Suspense } from 'react'
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'

interface Props {
    formData: any
    onChange: OnHandleChange
    isAddForm?: boolean
}

const ModelNameInput = lazy(async () => import('../../components/text-inputs/ModelNameInput'))
const CategoryComboBox = lazy(async () => import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => import('../../components/combo_box/BrandComboBox'))
const AddModelComputer = lazy(async () => import('./AddModelComputer').then(m => ({ default: m.AddModelComputer })))
const AddModelMonitor = lazy(async () => import('./AddModelMonitor').then(m => ({ default: m.AddModelMonitor })))
const AddModelPrinter = lazy(async () => import('./AddModelPrinter').then(m => ({ default: m.AddModelPrinter })))
const AddModelKeyboard = lazy(async () => import('./AddModelKeyboard').then(m => ({ default: m.AddModelKeyboard })))

export function ModelInputs({ onChange, formData, isAddForm }: Props) {
    return (
      <>
        <Suspense fallback={<InputSkeletonLoading />}>
          <CategoryComboBox
            value={formData.categoryId}
            onChange={onChange}
            type='form'
            isAdd={isAddForm}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandComboBox
            value={formData.brandId}
            onChange={onChange}
            type='form'
            isAdd={isAddForm}
          />

        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ModelNameInput
            value={formData.name}
            onChange={onChange}
          />

        </Suspense>
        <Suspense>
          <AddModelComputer formData={formData} onChange={onChange} />
          <AddModelMonitor formData={formData} onChange={onChange} />
          <AddModelPrinter formData={formData} onChange={onChange} />
          <AddModelKeyboard formData={formData} onChange={onChange} />
        </Suspense>
      </>
    )
}