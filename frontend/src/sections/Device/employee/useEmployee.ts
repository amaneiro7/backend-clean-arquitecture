import { useEffect, useState } from 'react'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { EmployeeCreator } from '../../../modules/employee/employee/application/EmployeeCreator'
import { type Repository } from '../../../modules/shared/domain/repository'
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

export const useEmployee = (repository: Repository) => {  
  const allEmployeeGetter = new AllEmployeeGetter(repository)  
  const [loading, setLoading] = useState<boolean>(true)  
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])
  

  async function createEmployee (formData: EmployeePrimitives) {
    const employeeCreator = new EmployeeCreator(repository)
    await employeeCreator.create(formData)
    await searchEmployees()
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

  const getEmployee = new EmployeeGetter(repository)

  useEffect(() => {
    searchEmployees()
    return () => {
      setEmployees([])
    }
  }, [])
  return {
    employees,    
    loading,
    error,
    getEmployee,
    createEmployee,
  }
}
