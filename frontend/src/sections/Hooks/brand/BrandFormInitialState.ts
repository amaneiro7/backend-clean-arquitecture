import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useBrand } from './useBrand'
import { type BrandApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandName } from '../../../modules/devices/brand/domain/BrandName'

interface DefaultProps {
  name: Primitives<BrandName>
}

export const defaultInitialBrandState: DefaultProps = {
  name: ''
}
export const useBrandInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getBrand } = useBrand()
  const [preloadedBrandState, setPreloadedBrandState] = useState(defaultInitialBrandState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedBrandState(defaultInitialBrandState)
      return
    }

    if (location.state?.state !== undefined) {
      const { state: brand } = location.state
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
          console.error('useBrandInitialState', error)
        })
    }
  }, [id, location.state?.brand])

  return {
    preloadedBrandState
  }
}
