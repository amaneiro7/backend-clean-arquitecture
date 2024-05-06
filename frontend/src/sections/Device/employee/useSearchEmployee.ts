import { useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'

export interface UseSearchEmployee {
  employees: EmployeePrimitives[]
  loading: boolean
  error: string | null
  searchEmployees: (filter: SearchByCriteriaQuery) => Promise<void>
}

export const useSearchEmployee = (repository: Repository): UseSearchEmployee => {  
  const employeeByCriteria = new EmployeeGetterByCriteria(repository)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])

  async function searchEmployees (filter: SearchByCriteriaQuery): Promise<void> {    
    setLoading(true)
    employeeByCriteria
      .get(filter)
      .then((devices) => {
        setEmployees(devices)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)

        setError(error)
        setLoading(false)
      })
  }

  return {
    employees,
    loading,
    error,    
    searchEmployees
  }
}
