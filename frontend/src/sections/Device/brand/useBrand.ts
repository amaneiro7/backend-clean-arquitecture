import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { Uuid } from '../../../modules/shared/domain/value-object/Uuid'
import { AllBrandGetter } from '../../../modules/devices/brand/application/AllBrandGetter'
import { BrandCreator } from '../../../modules/devices/brand/application/BrandCreator'
import { type BrandPrimitives } from '../../../modules/devices/brand/domain/Brand'

export const useBrand = (repository: Repository) => {
  const allBrandGetter = new AllBrandGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brands, setBrands] = useState<BrandPrimitives[]>([])

  async function createBrand ({ name }: { name: string }) {
    const brandCreator = new BrandCreator(repository)
    const id = Uuid.random().value
    await brandCreator.create({ id, name })
    getDevices()
  }

  function getDevices () {
    setLoading(true)
    allBrandGetter
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

  useEffect(() => {
    getDevices()

    return () => {
      setBrands([])
    }
  }, [])

  return {
    brands,
    loading,
    error,
    createBrand
  }
}
