import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type EmployeeUserName } from '../../../modules/employee/employee/domain/UserName'
import { useEffect, useState } from 'react'
import { useEmployee } from './useEmployee'
import { DevicesApiResponse } from '../../../modules/shared/domain/types/responseTypes'

interface defaultProps {
  userName: Primitives<EmployeeUserName>
  devices?: DevicesApiResponse[]
  updatedAt?: string
}

const defaultInitialState: defaultProps = {
  userName: '',
  devices: [],
  updatedAt: undefined
}

export const useEmployeeInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { repository } = useAppContext()
  const { getEmployee } = useEmployee(repository)
  const [preloadedEmployeeState, setPreloadedEmployeeState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedEmployeeState(defaultInitialState)
      return
    }

    if (location.state?.state2 !== undefined) {
      const { state } = location.state
      console.log('employee state',state)
      setPreloadedEmployeeState(state)
    } else if (id === undefined) {
      navidate('/error')
    } else {
      getEmployee.getById(id)
        .then(employee => {
          console.log('employee fetching',employee)
          setPreloadedEmployeeState(employee as defaultProps)
        })
        .catch(error => {
          console.error('useEmployeeInitialState', error)
        })
    }
  }, [id, location.state?.state])

  return {
    preloadedEmployeeState
  }
}
