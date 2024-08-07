import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useBrand } from './useBrand'
import { type BrandApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type BrandPrimitives } from '../../../modules/devices/brand/domain/Brand'

export const defaultInitialBrandState: BrandPrimitives = {
  id: undefined,
  name: '',
}

export const useBrandInitialState = (): {
  preloadedBrandState: BrandPrimitives
  setResetState: () => void
  isAddForm: boolean
} => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getBrand } = useBrand()
  const [preloadedBrandState, setPreloadedBrandState] = useState(defaultInitialBrandState)

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const fetchBrand = useCallback(() => {
    getBrand.getById({ id })
      .then(brand => {
        const { name } = brand as BrandApiResponse
        setPreloadedBrandState({ name })
      })
      .catch(error => {
        console.error('useBrandInitialState', error)
      })
  }, [getBrand, id])

  const setResetState = () => {
    if (isAddForm) {
      setPreloadedBrandState({ id: undefined, ...defaultInitialBrandState })
    } else {
      fetchBrand()
    }
  }

  useEffect(() => {
    if (isAddForm) {
      setPreloadedBrandState(defaultInitialBrandState)
      return
    }

    if (location.state?.state !== undefined) {
      const brand = location.state?.state
      setPreloadedBrandState(brand)
    } else {
      if (!id) {
        navigate('/error')
        return
      }
      fetchBrand()
    }
  }, [fetchBrand, id, isAddForm, location.state?.state, navigate])

  return {
    preloadedBrandState,
    isAddForm,
    setResetState
  }
}
