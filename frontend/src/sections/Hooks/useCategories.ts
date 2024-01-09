import { useEffect, useState } from 'react'
import { getAll } from '../services/api'
export const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAll({ path: 'categories' })
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
