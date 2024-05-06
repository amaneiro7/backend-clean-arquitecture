import { useEffect, useState } from 'react'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
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

export const useEmployeeByCriteria = (repository: Repository, defaultQuery?: SearchByCriteriaQuery) => {
  const employeeByCriteria = new EmployeeGetterByCriteria(repository)
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)  
  const [error, setError] = useState<string | null>(null)  
  const [employeeWithDevives, setEmployeeWithDevives] = useState<EmployeePrimitives[]>([])  

  function searchEmployeesByCriteria () {
    setLoading(true)
    employeeByCriteria
      .get(query)
      .then((employees) => {
        setEmployeeWithDevives(employees)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoading(false)
      })
  }

  useEffect(() => {
    searchEmployeesByCriteria()
    return () => {
      setEmployeeWithDevives([])
    }
  }, [query])

  return {
    employeeWithDevives,
    loading,
    error,
    addFilter,
    cleanFilters
  }
}
