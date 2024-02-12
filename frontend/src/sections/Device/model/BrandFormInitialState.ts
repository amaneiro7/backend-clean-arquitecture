import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useModel } from './useMode'
import { type ModelApiresponse } from '../../../modules/shared/domain/types/responseTypes'

const defaultInitialState = {
  name: '',
  categoryId: 0,
  brandId: ''

}
export const useModelInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { repository } = useAppContext()
  const { getModel } = useModel(repository)
  const [preloadedModelState, setPreloadedModelState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedModelState(defaultInitialState)
      return
    }

    if (location.state?.model !== undefined) {
      const { model } = location.state
      setPreloadedModelState(model)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      getModel.getById({ id })
        .then(model => {
          const { name, categoryId, brandId } = model as ModelApiresponse
          setPreloadedModelState({ name, categoryId, brandId })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [id, location.state?.model])

  return {
    preloadedModelState
  }
}
