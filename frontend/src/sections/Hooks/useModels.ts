import { useEffect, useState } from 'react'
import { type Model } from '../../types/types'
import { getAll } from '../services/api'

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([])

  useEffect(() => {
    getAll({ path: 'models' })
      .then((data) => { setModels(data) })
      .catch(err => { console.error('useModels', err) })

    return () => {
      setModels([])
    }
  }, [])

  return {
    models
  }
}
