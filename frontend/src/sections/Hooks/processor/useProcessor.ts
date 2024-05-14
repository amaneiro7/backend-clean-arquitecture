import { useEffect, useState } from 'react'
import { AllProcessorGetter } from '../../../modules/devices/fetures/processor/application/AllProcessorGetter'
import { type ProcessorPrimitives } from '../../../modules/devices/fetures/processor/domain/Processor'
import { ProcessorCreator } from '../../../modules/devices/fetures/processor/application/ProcessorCreator'
import { ProcessorGetter } from '../../../modules/devices/fetures/processor/application/ProcessorGetter'
import { ApiProcessorRepository } from '../../../modules/devices/fetures/processor/infrastructure/ApiProcessorRepository'

export const useProcessor = () => {
  const repository = new ApiProcessorRepository()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<ProcessorPrimitives[]>([])

  async function createProcessor(payload: ProcessorPrimitives) {
    await new ProcessorCreator(repository).create(payload)
    await getProcessors()
  }

  async function getProcessors() {
    setLoading(true)
    new AllProcessorGetter(repository)
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
