import { useEffect, useState } from 'react'
import { type Model } from '../../types/types'
import { getAll } from '../services/api'

export const useModels = (repository: Repository) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [models, setModels] = useState<ModelPrimitives[]>([])

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
