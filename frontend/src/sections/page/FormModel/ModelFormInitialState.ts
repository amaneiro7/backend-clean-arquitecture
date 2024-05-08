import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useModel } from '../../Hooks/model/useMode'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type ModelName } from '../../../modules/devices/model/model/domain/ModelName'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'

interface defaultProps {
  id?: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
}
const defaultInitialState: defaultProps = {
  name: '',
  categoryId: '',
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

    if (location.state?.state !== undefined) {
      const { state: model } = location.state
      setPreloadedModelState(model)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      getModel.getById({ id })
        .then(model => {
          setPreloadedModelState(model)
        })
        .catch(error => {
          console.log('useModelInitialState', error)
        })
    }
  }, [id, location.state?.state])

  return {
    preloadedModelState
  }
}
