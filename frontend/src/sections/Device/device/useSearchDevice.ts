import { useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'

import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'


export const useSearchDevice = (repository: Repository) => {  
  const deviceByCriteria = new DeviceGetterByCriteria(repository)  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicesMappedApiResponse[]>([])

  async function searchDevices (filter: SearchByCriteriaQuery) {    
    setLoading(true)
    deviceByCriteria
      .get(filter)
      .then((devices) => {
        setDevices(devices as DevicesMappedApiResponse[])
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchDevices', error)

        setError(error)
        setLoading(false)
      })
  }

  return {
    devices,
    loading,
    error,    
    searchDevices
  }
}
