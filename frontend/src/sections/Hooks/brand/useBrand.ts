import { useEffect, useState } from 'react'
import { AllBrandGetter } from '../../../modules/devices/brand/application/AllBrandGetter'
import { BrandCreator } from '../../../modules/devices/brand/application/BrandCreator'
import { type BrandPrimitives } from '../../../modules/devices/brand/domain/Brand'
import { BrandGetter } from '../../../modules/devices/brand/application/BrandGetter'
import { ApiBrandRepository } from '../../../modules/devices/brand/infraestructure/ApiBrandRepository'

export const useBrand = () => {
  const repository = new ApiBrandRepository()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brands, setBrands] = useState<BrandPrimitives[]>([])

  async function createBrand(formData: BrandPrimitives) {
    const data = await new BrandCreator(repository).create(formData)
    getBrands()
    return data
  }

  function getBrands() {
    setLoading(true)
    new AllBrandGetter(repository)
      .get()
      .then((brand) => {
        setBrands(brand)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  const getBrand = new BrandGetter(repository)

  useEffect(() => {
    getBrands()

    return () => {
      setBrands([])
    }
  }, [])

  return {
    brands,
    loading,
    error,
    createBrand,
    getBrand
  }
}
