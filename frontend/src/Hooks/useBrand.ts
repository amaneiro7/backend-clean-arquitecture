import { useEffect, useMemo, useState } from 'react'
import { type Brand } from '../types/types'
import { getAll } from '../services/api'

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [sorted, setSorted] = useState(true)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAll({ path: 'brands' })
      .then(data => {
        setBrands(data)
      })
      .catch(err => {
        setError(err)
        console.error('useBrand', err)
      })

    return () => {
      setBrands([])
    }
  }, [])

  const sortedBrand = useMemo(() =>
    sorted
      ? brands.sort((a, b) => a.name.localeCompare(b.name))
      : brands
  , [sorted, brands])

  const handleSorted = () => {
    setSorted(!sorted)
  }

  return {
    brands: sortedBrand,
    loading,
    error,
    handleSorted
  }
}
