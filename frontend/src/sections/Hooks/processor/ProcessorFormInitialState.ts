import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useProcessor } from './useProcessor'
import { ProcessorPrimitives } from '../../../modules/devices/fetures/processor/domain/Processor'

const defaultInitialState: ProcessorPrimitives = {
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
  const [preloadedProcessorState, setPreloadedProcessorState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedProcessorState(defaultInitialState)
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
    id
  }
}
