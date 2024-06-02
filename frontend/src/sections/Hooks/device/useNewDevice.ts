import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'

export interface UseDevice {
    devices: DevicePrimitives[]
    loading: boolean
    error: string | null
    getDevice: DeviceGetter
    createDevice: (formData: DevicePrimitives) => Promise<void>
    searchDevices: (filter: SearchByCriteriaQuery) => void
    handleSync: () => void
}

export const useDevice = (query?: SearchByCriteriaQuery): UseDevice => {
    const repository = new ApiDeviceRepository()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [sync, setSync] = useState(true)
    const [devices, setDevices] = useState<DevicePrimitives[]>([])

    async function createDevice(formData: DevicePrimitives) {
        const data = await new DeviceCreator(repository).create(formData)
        searchDevices(query)
        return data
    }

    const handleSync = () => {
        setSync(true)
    }

    function searchDevices(filter: SearchByCriteriaQuery) {
        setLoading(true)
        new DeviceGetterByCriteria(repository)
            .get(filter)
            .then((devices) => { setDevices(devices) })
            .catch((error) => {
                console.error('searchDevices', error)
                setError(error)
            })
            .finally(() => { setLoading(false) })
    }

    const getDevice = new DeviceGetter(repository)

    useEffect(() => {
        if (!sync) return        
        searchDevices(query)
        setSync(false)
        return () => {
            setDevices([])
        }
    }, [sync])

    return {
        devices,
        loading,
        error,
        getDevice,
        createDevice,
        searchDevices,
        handleSync
    }
}
