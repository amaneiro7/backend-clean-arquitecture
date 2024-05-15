import { useEffect, useState } from 'react'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { EmployeeCreator } from '../../../modules/employee/employee/application/EmployeeCreator'
import { AllEmployeeGetter } from '../../../modules/employee/employee/application/AllEmployeeGetter'
import { ApiEmployeeRepository } from '../../../modules/employee/employee/infrastructure/ApiEmployeeRepository'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'

export interface UseEmployee {
  employees: EmployeePrimitives[]
  loading: boolean
  error: string | null
  getEmployee: EmployeeGetter
  createEmployee: (formData: EmployeePrimitives) => Promise<void>
}

export const useEmployee = (): UseEmployee => {  
  const repository = new ApiEmployeeRepository()
  const [loading, setLoading] = useState<boolean>(true)  
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])
  
  
  async function createEmployee (formData: EmployeePrimitives) {
    await new EmployeeCreator(repository).create(formData)
    await searchEmployees()
  }
  
  async function searchEmployees () {    
    setLoading(true)
    new AllEmployeeGetter(repository)
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
