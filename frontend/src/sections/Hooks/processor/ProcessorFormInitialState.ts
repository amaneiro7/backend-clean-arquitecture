import { useCallback, useEffect, useMemo, useState } from 'react'
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
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const fetchUser = useCallback(() => {
    getProcessor.getById({ id })
      .then(processor => {
        setPreloadedProcessorState(processor)
      })
      .catch(error => {
        console.error(error)
      })
  }, [getProcessor, id])

  const setResetState = () => {
    if (isAddForm) {
      setPreloadedProcessorState({ id: undefined, ...defaultInitialProcessorState })
    } else {
      fetchUser()
    }
  }

  useEffect(() => {
    if (isAddForm) {
      setPreloadedProcessorState(defaultInitialProcessorState)
      return
    }

    if (location.state?.state !== undefined) {
      const processor = location.state?.state

      setPreloadedProcessorState(processor)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      fetchUser()
    }
  }, [fetchUser, id, isAddForm, location.state?.state, navigate])

  return {
    preloadedProcessorState,
    isAddForm,
    setResetState
  }
}
