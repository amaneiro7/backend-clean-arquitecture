import { useEffect, useState } from 'react'
import { type Model } from '../types/types'
import { fetchModels } from '../utils/fetchMoldels'

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([])

  useEffect(() => {
    fetchModels()
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
