import { useEffect, useState } from 'react'
import { type Brand } from '../types/types'
import { getAll } from '../services/api'

// const initialState = {
//   loading: true,
//   error: null

// }
export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [sorted, setSorted] = useState(false)
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

  return {
    brands
  }
}
