import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { AllProcessorGetter } from '../../../../modules/devices/fetures/processor/application/AllProcessorGetter'
import { type ProcessorPrimitives } from '../../../../modules/devices/fetures/processor/domain/Processor'
import { ProcessorCreator } from '../../../../modules/devices/fetures/processor/application/ProcessorCreator'
import { ProcessorGetter } from '../../../../modules/devices/fetures/processor/application/BrandGetter'

export const useProcessor = (repository: Repository) => {
  const dataGetter = new AllProcessorGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<ProcessorPrimitives[]>([])

  async function createProcessor (payload: ProcessorPrimitives) {    
    await new ProcessorCreator(repository).create(payload)
    await getProcessors()
  }

  async function getProcessors () {
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

  const getProcessor = new ProcessorGetter(repository)

  useEffect(() => {
    getProcessors()

    return () => {
      setData([])
    }
  }, [])

  return {
    processors: data,
    loading,
    error,
    createProcessor,
    getProcessor
  }
}
