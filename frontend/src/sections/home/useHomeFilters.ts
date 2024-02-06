import { useAppContext } from '../Context/AppContext'
import { useInputsData } from './useInputData'

const initialState = {
  categoryId: '',
  brandId: '',
  serial: '',
  activo: '',
  statusId: '',
  modelId: ''
}

export function useHomeFilters () {
  const { queryParams, devices } = useAppContext()

  return {}
}
