import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type EmployeeUserName } from '../../../modules/employee/employee/domain/UserName'
import { useEffect, useState } from 'react'
import { useEmployee } from './useEmployee'

interface defaultProps {
  userName: Primitives<EmployeeUserName>
}

const defaultInitialState: defaultProps = {
  userName: ''
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

    if (location.state?.state !== undefined) {
      const { state } = location.state
      setPreloadedEmployeeState(state)
    } else if (id === undefined) {
      navidate('/error')
    } else {
      getEmployee.getById(id)
        .then(employee => {
          setPreloadedEmployeeState(employee)
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
