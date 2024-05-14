import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type EmployeeUserName } from '../../../modules/employee/employee/domain/UserName'
import { useEffect, useState } from 'react'
import { useEmployee } from './useEmployee'
import { DevicesApiResponse } from '../../../modules/shared/domain/types/responseTypes'

interface DefaultProps {
  userName: Primitives<EmployeeUserName>
  devices?: DevicesApiResponse[]
  updatedAt?: string
}

export const defaultInitialEmployeeState: DefaultProps = {
  userName: '',
  devices: [],
  updatedAt: undefined
}

export const useEmployeeInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { getEmployee } = useEmployee()
  const [preloadedEmployeeState, setPreloadedEmployeeState] = useState(defaultInitialEmployeeState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedEmployeeState(defaultInitialEmployeeState)
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
          setPreloadedEmployeeState(employee as DefaultProps)
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