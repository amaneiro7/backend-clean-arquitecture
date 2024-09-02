import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useEmployee } from './useEmployee'

import { DefaultEmployeeProps } from './DefaultInitialState'

export const defaultInitialEmployeeState: DefaultEmployeeProps = {
  id: undefined,
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

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const fetchEmployee = useCallback(() => {
    getEmployee.getById(id)
      .then(employee => {
        setPreloadedEmployeeState(employee as DefaultEmployeeProps)
      })
      .catch(error => {
        console.error('useEmployeeInitialState', error)
      })
  }, [getEmployee, id])

  const setResetState = () => {
    if (isAddForm) {
      setPreloadedEmployeeState({ id: undefined, ...defaultInitialEmployeeState })
    } else {
      fetchEmployee()
    }
  }

  useEffect(() => {
    if (isAddForm) {
      setPreloadedEmployeeState(defaultInitialEmployeeState)
      return
    }

    if (location.state?.state2 !== undefined) {
      const employee = location.state?.state
      setPreloadedEmployeeState(employee)
    } else {
      if (!id) {
        navidate('/error')
        return
      }
      fetchEmployee()
    }

  }, [fetchEmployee, id, isAddForm, location.state?.state, location.state?.state2, navidate])

  return {
    preloadedEmployeeState,
    setResetState,
    isAddForm
  }
}
