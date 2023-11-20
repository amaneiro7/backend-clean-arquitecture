import { useEffect, useState } from 'react'
import { fetchDatas } from '../utils/fetchData'
import { type Brand } from '../types/types'

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
    fetchDatas({ path: 'brands' })
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
