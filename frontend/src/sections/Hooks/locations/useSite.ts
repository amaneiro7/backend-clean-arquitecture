import { useCallback, useEffect, useState } from 'react'
import { SitePrimitives } from '../../../modules/location/site/domain/site'
import { ApiSiteRepository } from '../../../modules/location/site/infraestructure/ApiSiteRepository'
import { AllSiteGetter } from '../../../modules/location/site/application/AllSiteGetter'


export interface UseSites {
    sites: SitePrimitives[]
    loading: boolean
    error: Error | null
}

export const useSite = (): UseSites => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sites, setSites] = useState<SitePrimitives[]>([])

    const fetchData = useCallback(() => {
        setLoading(true)
        new AllSiteGetter(new ApiSiteRepository())
            .get()
            .then((res) => {
                setSites(res)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetchData()

        return () => {
            setSites([])
        }
    }, [fetchData])

    return {
        sites,
        loading,
        error
    }
}
