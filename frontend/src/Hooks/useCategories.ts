import { useEffect, useState } from 'react'
import { fetchDatas } from '../utils/fetchData'
export const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchDatas({ path: 'categories' })
      .then((data) => { setCategories(data) })
      .catch(err => { console.error('useCategories', err) })

    return () => {
      setCategories([])
    }
  }, [])

  return {
    categories
  }
}
