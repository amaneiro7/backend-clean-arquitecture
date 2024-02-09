import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { Uuid } from '../../../../modules/shared/domain/value-object/Uuid'
import { HardDriveCreator } from '../../../../modules/devices/fetures/hardDrive/hardDrive/application/HardDriveCreator'
import { type HardDrivePrimitives } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { AllHardDriveGetter } from '../../../../modules/devices/fetures/hardDrive/hardDrive/application/AllHardDriveGetter'

export const useHardDrive = (repository: Repository) => {
  const dataGetter = new AllHardDriveGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDrivePrimitives[]>([])

  async function createProcessor ({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health }: Omit<HardDrivePrimitives, 'id'>) {
    const id = Uuid.random().value
    await new HardDriveCreator(repository).create({ id, categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId })
  }

  function fetchData () {
    setLoading(true)
    dataGetter
      .get()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()

    return () => {
      setData([])
    }
  }, [])

  return {
    hardDrive: data,
    loading,
    error,
    createProcessor
  }
}
