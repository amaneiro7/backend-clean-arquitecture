import { useMemo } from 'react'
import { useBrands } from './useBrand'
import { useCategories } from './useCategories'
import { useStatus } from './useStatus'
import { useModels } from './useModels'

interface Props {
  categoryId?: string | number
  brandId?: string | number

}
export const useFormFieldData = ({ categoryId = '', brandId = '' }: Props) => {
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { status } = useStatus()
  const { models } = useModels()

  const filterdBrands = useMemo(() => {
    if (categoryId !== '') {
      const ids = {}
      return models
        .filter(brand => brand?.category?.id === categoryId)
        .map(elem => elem.brand)
        .filter(brand => (ids[brand.id]) ? false : ids[brand.id] = true)
    }
    return brands
  }, [brands, categoryId])

  const filterdModels = useMemo(() => {
    return models.filter(model => {
      const categoryMatch = categoryId === '' || model.category.id === categoryId
      const brandMatch = brandId === '' || model.brand.id === brandId
      return categoryMatch && brandMatch
    })
  }, [models, categoryId, brandId])

  return {
    categories,
    brands: filterdBrands ?? brands,
    status,
    models: filterdModels ?? models
  }
}
