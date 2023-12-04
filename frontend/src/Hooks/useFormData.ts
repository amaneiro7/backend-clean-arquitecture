import { useMemo } from 'react'
import { useBrands } from './useBrand'
import { useCategories } from './useCategories'
import { useStatus } from './useStatus'
import { useModels } from './useModels'

interface Props {
  categoryId?: string | number | undefined
  brandId?: string | number | undefined

}
export const useFormFieldData = ({ categoryId = undefined, brandId = undefined }: Props) => {
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { status } = useStatus()
  const { models } = useModels()

  const filterdBrands = useMemo(() => {
    if (categoryId !== undefined) {
      const ids = {}
      return models
        .filter(brand => brand?.category?.id === categoryId)
        .map(elem => elem.brand)
        .filter(brand => (ids[brand.id]) ? false : ids[brand.id] = true)
    }
    return brands
  }, [categoryId])

  const filterdModels = useMemo(() => {
    if (categoryId !== undefined || brandId !== undefined) {
      return (
        models.filter(model => model.brand.id === brandId && model.category.id === categoryId)
      )
    }
    return models
  }, [categoryId, brandId])

  return {
    categories,
    brands: filterdBrands,
    status,
    models: filterdModels
  }
}
