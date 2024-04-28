import { useEffect, useState } from 'react'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { EmployeeCreator } from '../../../modules/employee/employee/application/EmployeeCreator'
import { type Repository } from '../../../modules/shared/domain/repository'
import { useSearchByCriteriaQuery } from '../../Hooks/useQueryUpdate'
import { AllEmployeeGetter } from '../../../modules/employee/employee/application/AllEmployeeGetter'

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
  const allEmployeeGetter = new AllEmployeeGetter(repository)  
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingWithDevice, setLoadingWithDevice] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])
  const [employeeWithDevives, setEmployeeWithDevives] = useState<EmployeePrimitives[]>([])

  async function createEmployee (formData: EmployeePrimitives) {
    const employeeCreator = new EmployeeCreator(repository)
    await employeeCreator.create(formData)
    await searchEmployees()
    await searchEmployeesByCriteria()
  }

  async function searchEmployees () {    
    setLoading(true)
    allEmployeeGetter
    .get()
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
  async function searchEmployeesByCriteria () {
    setLoading(true)
    employeeByCriteria
      .get(query)
      .then((employees) => {
        setEmployeeWithDevives(employees)
        setLoadingWithDevice(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoadingWithDevice(false)
      })
  }

  const getEmployee = new EmployeeGetter(repository)

  useEffect(() => {
    searchEmployees()
    return () => {
      setEmployees([])
    }
  }, [])

  useEffect(() => {
    searchEmployeesByCriteria()
    return () => {
      setEmployeeWithDevives([])
    }
  }, [query])

  return {
    employees,
    employeeWithDevives,
    loadingWithDevice,
    loading,
    error,
    getEmployee,
    createEmployee,
    addFilter,
    cleanFilters
  }
}
