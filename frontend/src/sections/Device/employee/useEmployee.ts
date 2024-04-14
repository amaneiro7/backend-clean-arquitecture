import { useEffect, useState } from 'react'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { EmployeeCreator } from '../../../modules/employee/employee/application/EmployeeCreator'
import { type Repository } from '../../../modules/shared/domain/repository'
import { useSearchByCriteriaQuery } from '../../Hooks/useQueryUpdate'

export interface UseEmployee {
  employees: EmployeePrimitives[]
  loading: boolean
  error: string | null
  getEmployee: EmployeeGetter
  createEmployee: (formData: EmployeePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useEmployee = (repository: Repository) => {
  const employeeByCriteria = new EmployeeGetterByCriteria(repository)
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery()
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
  const getEmployee = new EmployeeGetter(repository)

  useEffect(() => {
    searchEmployees()
  }, [query])

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
