import { useEffect, useMemo, useState } from 'react'
import { type Brand, type Category, type Model, type Device } from '../types/types'
import { getAll } from '../services/api'
import { useCategories } from './useCategories'
import { useBrands } from './useBrand'
import { useModels } from './useModels'

export const useDevice = (): {
  device: Device[]
  categories: Category[]
  filterdBrands: Brand[]
  filterdModels: Model[]
} => {
  const [device, setDevice] = useState<Device[]>([])
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { models } = useModels()

  useEffect(() => {
    getAll({ path: 'device' })
      .then(devices => { setDevice(devices) })
      .catch(err => { console.error('useDevive', err) })

    return () => {
      setDevice([])
    }
  }, [])

  const filterdBrands = useMemo(() => {
    if (device?.categoryId) {
      const ids = {}
      return models
        .filter(brand => brand?.category?.id === device?.categoryId)
        .map(elem => elem.brand)
        .filter(brand => ids[brand.id] ? false : ids[brand.id] = true)
    }
    return brands
  }, [device?.categoryId])

  const filterdModels = useMemo(() => {
    if (device.id) {
      return (
        models.filter(model => model.brand.id === device.brandId && model.category.id === device.categoryId)
      )
    }
  }, [device?.brandId])

  return {
    device,
    categories,
    filterdBrands: brands,
    filterdModels: models
  }
}
