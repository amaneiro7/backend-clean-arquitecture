import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSiteLocation } from './useLocation'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type SiteId } from '../../../modules/location/site/domain/SiteId'
import { type TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type LocationName } from '../../../modules/location/locations/domain/LocationName'
import { type Subnet } from '../../../modules/location/locations/domain/Subnet'
import { type RegionId } from '../../../modules/location/region/domain/RegionId'
import { type StateId } from '../../../modules/location/state/domain/StateId'
import { type CityId } from '../../../modules/location/city/domain/CityId'
import { type LocationApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type LocationPrimitives } from '../../../modules/location/locations/domain/location'

export interface DefaultLocationProps {
  id?: Primitives<LocationId>
  name: Primitives<LocationName>
  typeOfSiteId: Primitives<TypeOfSiteId>
  siteId: Primitives<SiteId>
  subnet: Primitives<Subnet>
  regionId: Primitives<RegionId>
  stateId: Primitives<StateId>
  siteName?: string
  cityId: Primitives<CityId>
  updatedAt?: string
}

export const defaultInitialLocationState: DefaultLocationProps = {
  id: undefined,
  name: '',
  typeOfSiteId: '',
  siteId: '',
  subnet: '',
  regionId: '',
  stateId: '',
  cityId: '',
  siteName: '',
  updatedAt: undefined
}

export const useLocationInitialState = () => {
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
  }, [fetchLocation, id, isAddForm, location.state?.state, navidate, processLocationState])

  return {
    preloadedLocationState,
    isAddForm,
    setResetState
  }
}

