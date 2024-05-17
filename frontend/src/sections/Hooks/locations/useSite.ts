import { useEffect, useState } from 'react'
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
    const repository = new ApiSiteRepository()

    function gefetchData() {
        setLoading(true)
        new AllSiteGetter(repository)
            .get()
            .then((res) => {
                setSites(res)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        gefetchData()

        return () => {
            setSites([])
        }
    }, [])

    return {
        sites,
        loading,
        error
    }
}
