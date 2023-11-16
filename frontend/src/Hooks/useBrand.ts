import { useEffect, useState } from 'react'
import { fetchBrands } from '../utils/fetchtBrands'

export const useBrands = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchBrands()
      .then((data) => { setBrands(data) })
      .catch(err => { console.error('useBrand', err) })

    return () => {
      setBrands([])
    }
  }, [])

  return {
    brands
  }
}
