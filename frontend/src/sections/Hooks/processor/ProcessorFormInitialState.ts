import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useProcessor } from './useProcessor'
import { ProcessorPrimitives } from '../../../modules/devices/fetures/processor/domain/Processor'

export const defaultInitialProcessorState: ProcessorPrimitives = {
  id: undefined,
  name: '',
  cores: 1,
  frequency: 1,
  threads: false,
  numberModel: "",
  productCollection: "",
}
export const useProcessorInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getProcessor } = useProcessor()
  const [preloadedProcessorState, setPreloadedProcessorState] = useState(defaultInitialProcessorState)

  const isAddForm = useMemo(() => {
    return location.pathname.includes('add')
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedProcessorState(defaultInitialProcessorState)
      return
    }

    if (location.state?.brand !== undefined) {
      const { processor } = location.state

      setPreloadedProcessorState(processor)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      getProcessor.getById({ id })
        .then(processor => {
          setPreloadedProcessorState(processor)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [id, location.state?.brand])

  return {
    preloadedProcessorState,
    isAddForm
  }
}
