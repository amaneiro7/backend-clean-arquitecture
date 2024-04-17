import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { EmployeeCreator } from '../../../modules/employee/employee/application/EmployeeCreator'
import { type Repository } from '../../../modules/shared/domain/repository'
import { useSearchByCriteriaQuery } from '../../Hooks/useQueryUpdate'
import { EmployeeGetterDevicesByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterDevicesByCriteria'

export interface UseEmployee {
  employees: EmployeePrimitives[]
  loading: boolean
  error: string | null
  getEmployee: EmployeeGetter
  createEmployee: (formData: EmployeePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useEmployee = (repository: Repository, defaultQuery?: SearchByCriteriaQuery) => {
  const employeeByCriteria = new EmployeeGetterByCriteria(repository)
  const employeeDeviceByCriteria = new EmployeeGetterDevicesByCriteria(repository)
  const location = useLocation()
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])

  async function createEmployee (formData: EmployeePrimitives) {
    const employeeCreator = new EmployeeCreator(repository)
    await employeeCreator.create(formData)
    searchEmployees()
  }

  function searchEmployees () {
    setLoading(true)
    employeeByCriteria
      .get(query)
      .then((employees) => {
        setEmployees(employees)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoading(false)
      })
  }
  function searchEmployeesWithDevices () {
    setLoading(true)
    employeeDeviceByCriteria
      .get(query)
      .then((employees) => {
        setEmployees(employees)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployeesWithDevices', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoading(false)
      })
  }
  const getEmployee = new EmployeeGetter(repository)

  useEffect(() => {
    if (['/', '/login', '/equipos/torre', '/equipos/agencia', '/almacen'].includes(location.pathname)) {
      setEmployees([])
    } else if (['/employees/agencia'].includes(location.pathname)) {
      searchEmployeesWithDevices()
    } else if (['/employees/torre'].includes(location.pathname)) {
      searchEmployeesWithDevices()
    } else {
      searchEmployees()
    }

    return () => {
      setEmployees([])
    }
  }, [location, query])

  return {
    employees,
    loading,
    error,
    getEmployee,
    createEmployee,
    addFilter,
    cleanFilters
  }
}