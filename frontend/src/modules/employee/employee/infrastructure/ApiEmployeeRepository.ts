import { type Criteria } from '../../../shared/domain/criteria/Criteria'
import { type EmployeeMappedApiResponse, type EmployeesApiResponse } from '../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type EmployeePrimitives, type Employee } from '../domain/Employee'
import { type EmployeeId } from '../domain/EmployeeId'
import { type EmployeeRepository } from '../domain/EmployeeRepository'

export class ApiEmployeeRepository implements EmployeeRepository {
  private readonly endpoint: string = 'employees'
  async save ({ employee }: { employee: Employee }): Promise<void> {
    await makeRequest({ method: 'POST', endpoint: this.endpoint, data: employee.toPrimitives() })
  }

  async update ({ id, employee }: { id: EmployeeId, employee: Employee }): Promise<void> {
    await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: employee.toPrimitives() })
  }

  async getByCriteria (criteria: Criteria): Promise<EmployeePrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const filters = criteriaPrimitives.filters.length > 0 && criteriaPrimitives.filters.map(
      (filter, index) => {
        const { field, operator, value } = filter.toPrimitives()
        return `filters[${index}][field]=${field}&filters[${index}][operator]=${operator}&filters[${index}][value]=${value}`
      }
    )
    const paramsLimitAndOffset = criteriaPrimitives.limit ? `limit=${criteriaPrimitives.limit}&offset=${criteriaPrimitives.offset}` : undefined
    const paramsOrder = criteriaPrimitives.orderBy ? `orderBy=${criteriaPrimitives.orderBy}&orderType=${criteriaPrimitives.orderType}` : undefined
    const paramsFilters = filters ? `${filters.join('&')}` : undefined
    const queryParams = [paramsFilters, paramsLimitAndOffset, paramsOrder].filter(Boolean).join('&')
    return await makeRequest<EmployeesApiResponse[]>({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })
      .then(res => res.map(data => ({
        id: data.id,
        name: data.name,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        cedula: data.cedula,
        locationId: data.location.id,
        locationName: data.location.name,
        extension: data.extension,
        phoneNumber: data.phoneNumber,
        vicepresidenciaEjecutivaId: data.vicepresidenciaEjecutiva.id,
        vicepresidenciaEjecutivaName: data.vicepresidenciaEjecutiva.name,
        vicepresidenciaId: data.vicepresidencia.id,
        vicepresidenciaName: data.vicepresidencia.name,
        gerenciaId: data.gerencia.id,
        gerenciaName: data.gerencia.name,
        coordinacionId: data.coordinacion.id,
        coordinacionName: data.coordinacion.name,
        devices: data.devices,
        cargoId: data.cargo.id,
        cargoName: data.cargo.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }) satisfies EmployeeMappedApiResponse))
      .catch((error: any) => {
        console.error('Infra', error)
        throw new Error(error.message)
      })
  }

  async getAll (): Promise<EmployeePrimitives[]> {
    return await makeRequest<EmployeesApiResponse[]>({ method: 'GET', endpoint: this.endpoint })
      .then(res => res.map(data => ({
        id: data.id,
        name: data.name,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        cedula: data.cedula,
        locationId: data.location.id,
        locationName: data.location.name,
        extension: data.extension,
        phoneNumber: data.phoneNumber,
        vicepresidenciaEjecutivaId: data.vicepresidenciaEjecutiva.id,
        vicepresidenciaEjecutivaName: data.vicepresidenciaEjecutiva.name,
        vicepresidenciaId: data.vicepresidencia.id,
        vicepresidenciaName: data.vicepresidencia.name,
        gerenciaId: data.gerencia.id,
        gerenciaName: data.gerencia.name,
        coordinacionId: data.coordinacion.id,
        coordinacionName: data.coordinacion.name,
        devices: data.devices,
        cargoId: data.cargo.id,
        cargoName: data.cargo.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }) satisfies EmployeeMappedApiResponse))
  }

  async getById ({ id }: { id: EmployeeId }): Promise<EmployeePrimitives> {
    return await makeRequest<EmployeesApiResponse>({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
      .then(data => ({
        id: data.id,
        name: data.name,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        cedula: data.cedula,
        locationId: data.location.id,
        locationName: data.location.name,
        extension: data.extension,
        phoneNumber: data.phoneNumber,
        vicepresidenciaEjecutivaId: data.vicepresidenciaEjecutiva.id,
        vicepresidenciaEjecutivaName: data.vicepresidenciaEjecutiva.name,
        vicepresidenciaId: data.vicepresidencia.id,
        vicepresidenciaName: data.vicepresidencia.name,
        gerenciaId: data.gerencia.id,
        gerenciaName: data.gerencia.name,
        coordinacionId: data.coordinacion.id,
        coordinacionName: data.coordinacion.name,
        devices: data.devices,
        cargoId: data.cargo.id,
        cargoName: data.cargo.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }) satisfies EmployeeMappedApiResponse)
  }
}
