import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type BrandApiResponse } from '../../../modules/shared/domain/types/responseTypes'

import { useBrand } from './useBrand'

const defaultInitialState = {
  name: ''
}
export const useBrandInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { repository } = useAppContext()
  const { getBrand } = useBrand(repository)
  const [preloadedBrandState, setPreloadedBrandState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedBrandState(defaultInitialState)
      return
    }

    if (location.state?.brand !== undefined) {
      const { brand } = location.state

      setPreloadedBrandState(brand)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      getBrand.getById({ id })
        .then(brand => {
          const { name } = brand as BrandApiResponse
          setPreloadedBrandState({ name })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [id, location.state?.brand])

  return {
    preloadedBrandState,
    id
  }
}
