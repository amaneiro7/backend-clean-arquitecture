import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { LocationId } from '../../../modules/location/locations/domain/locationId'
import { SiteId } from '../../../modules/location/site/domain/SiteId'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { LocationName } from '../../../modules/location/locations/domain/LocationName'
import { Subnet } from '../../../modules/location/locations/domain/Subnet'
import { useSiteLocation } from './useLocation'

interface DefaultProps {
  id?: Primitives<LocationId>
  name: Primitives<LocationName>
  typeOfSiteId: Primitives<TypeOfSiteId>
  siteId: Primitives<SiteId>
  subnet: Primitives<Subnet>
  updatedAt?: string
}

export const defaultInitialLocationState: DefaultProps = {
  id: undefined,
  name: '',
  typeOfSiteId: '',
  siteId: '',
  subnet: '',
  updatedAt: undefined
}

export const useLocationInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { getLocation } = useSiteLocation()
  const [preloadedLocationState, setPreloadedLocationState] = useState(defaultInitialLocationState)

  const isAddForm = useMemo(() => {
    return location.pathname.includes('add')
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedLocationState(defaultInitialLocationState)
      return
    }

    if (location.state?.state2 !== undefined) {
      const { state } = location.state
      setPreloadedLocationState(state)
    } else if (id === undefined) {
      navidate('/error')
    } else {
      getLocation.getById(id)
        .then(location => {
          setPreloadedLocationState(location as DefaultProps)
        })
        .catch(error => {
          console.error('useLocationInitialState', error)
        })
    }
  }, [id, location.state?.state])

  return {
    preloadedLocationState,
    isAddForm
  }
}
