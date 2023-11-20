import { useEffect, useMemo, useState } from 'react'
import { fetchDatas } from '../utils/fetchData'
import { type Brand } from '../types/types'

// const initialState = {
//   loading: true,
//   error: null

// }
interface Props {
  category?: string | undefined
}
export const useBrands = ({ category = undefined }: Props) => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [sorted, setSorted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchDatas({ path: 'brands' })
      .then(data => {
        console.log(data)

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

  const filterdBrands = useMemo(() => {
    console.log('calculate FilteredBrands')

    return category != null && category !== undefined
      ? brands.filter(brand => {
        return brand.id.includes(category)
      })
      : brands
  }, [brands, category])
  console.log(filterdBrands)

  return {
    brands
  }
}
