import { useEffect, useState } from 'react'
import { ApiRegionRepository } from '../../../modules/location/region/infraestructure/ApiRegionRepository'
import { RegionPrimitives } from '../../../modules/location/region/domain/region'
import { AllRegionGetter } from '../../../modules/location/region/application/AllRegionGetter'



export interface UseRegion {
    regions: RegionPrimitives[]
    loading: boolean
    error: Error | null
}

export const useRegion = (): UseRegion => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [regions, setRegion] = useState<RegionPrimitives[]>([])
    const repository = new ApiRegionRepository()

    function gefetchData() {
        setLoading(true)
        new AllRegionGetter(repository)
            .get()
            .then((res) => {
                setRegion(res)
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
            setRegion([])
        }
    }, [])

    return {
        regions,
        loading,
        error
    }
}
