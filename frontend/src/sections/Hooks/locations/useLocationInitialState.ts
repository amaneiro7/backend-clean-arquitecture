import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSiteLocation } from './useLocation'
import { type LocationPrimitives } from '@/modules/location/locations/domain/location'
import { type LocationApiResponse } from '@/modules/shared/domain/types/responseTypes'
import { type DefaultLocationProps } from './DefaultInitialState'

export const useLocationInitialState = (defaultInitialLocationState: DefaultLocationProps) => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { getLocation } = useSiteLocation()
  const [preloadedLocationState, setPreloadedLocationState] = useState(defaultInitialLocationState)

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const processLocationState = useCallback((location: LocationPrimitives): void => {
    const { id, name, site, siteId, subnet, typeOfSiteId } = location as LocationApiResponse
    const { name: siteName, cityId, city } = site
    const { state, stateId } = city
    const { regionId } = state
    setPreloadedLocationState(prev => ({ ...prev, id, name, siteId, subnet: subnet ?? '', typeOfSiteId, siteName, cityId, stateId, regionId }))
  }, [])

  const fetchLocation = useCallback(() => {
    getLocation.getById(id)
      .then(location => {
        processLocationState(location)
      })
      .catch(error => {
        console.error('useLocationInitialState', error)
      })
  }, [getLocation, id, processLocationState])

  const setResetState = () => {
    if (isAddForm) {
      processLocationState({ id: undefined, ...defaultInitialLocationState })
    } else {
      fetchLocation()
    }
  }

  useEffect(() => {
    if (isAddForm) {
      setPreloadedLocationState(defaultInitialLocationState)
      return
    }
    if (location.state?.state) {
      const state = location.state?.state
      processLocationState(state)
    } else {
      if (!id) {
        navidate('/error')
        return
      }
      fetchLocation()
    }
  }, [defaultInitialLocationState, fetchLocation, id, isAddForm, location.state?.state, navidate, processLocationState])

  return {
    preloadedLocationState,
    isAddForm,
    setResetState
  }
}

