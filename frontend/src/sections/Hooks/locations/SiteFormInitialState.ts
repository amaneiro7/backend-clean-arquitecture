import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DefaultSiteProps } from './DefaultSiteInitialState'
import { useGetSite } from './useGetSite'

export const defaultInitialSiteState: DefaultSiteProps = {
  id: undefined,
  name: '',
  address: '',
  cityId: '',
  updatedAt: undefined
}

export const useSiteInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { getDevice } = useGetSite()
  const [preloadedSiteState, setPreloadedSiteState] = useState(defaultInitialSiteState)

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const fetchSite = useCallback(() => {
    getDevice({ id })
      .then(site => {
        setPreloadedSiteState(site as DefaultSiteProps)
      })
      .catch(error => {
        console.error('useSiteInitialState', error)
      })
  }, [getDevice, id])

  const setResetState = () => {
    if (isAddForm) {
      setPreloadedSiteState({ id: undefined, ...defaultInitialSiteState })
    } else {
      fetchSite()
    }
  }

  useEffect(() => {
    if (isAddForm) {
      setPreloadedSiteState(defaultInitialSiteState)
      return
    }

    if (location.state?.state !== undefined) {
      const site = location.state?.state
      setPreloadedSiteState(site)
    } else {
      if (!id) {
        navidate('/error')
        return
      }
      fetchSite()
    }

  }, [fetchSite, id, isAddForm, location.state?.state, navidate])

  return {
    preloadedSiteState,
    setResetState,
    isAddForm
  }
}
