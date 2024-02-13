import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useProcessor'
import { type ProcessorApiresponse } from '../../../../modules/shared/domain/types/responseTypes'

const defaultInitialState = {
  name: ''
}
export const useProcessorInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { repository } = useAppContext()
  const { getProcessor } = useProcessor(repository)
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
          const { name } = processor as ProcessorApiresponse
          setPreloadedProcessorState({ name })
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
