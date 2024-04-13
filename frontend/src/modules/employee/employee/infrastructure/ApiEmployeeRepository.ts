import { type Criteria } from '../../../shared/domain/criteria/Criteria'
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
    return await makeRequest<EmployeePrimitives[]>({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })
    //   .then(res => res.map(data => ({
    //     id: data.id,
    //     serial: data.serial,
    //     activo: data.activo ?? 'Sin Serial',
    //     statusId: data.status.id,
    //     statusName: data.status.name,
    //     categoryId: data.category.id,
    //     categoryName: data.category.name,
    //     brandId: data.brand.id,
    //     brandName: data.brand.name,
    //     modelId: data.model.id,
    //     modelName: data.model.name,
    //     locationId: data.location.id,
    //     locationName: data.location.name,
    //     observation: data.observation,
    //     employeeId: data.employee?.id ?? null,
    //     employeeName: data.employee?.name ?? 'Vacante',
    //     computer: data.computer,
    //     hardDrive: data.hardDrive,
    //     createdAt: data.createdAt,
    //     updatedAt: data.updatedAt
    //   }) satisfies DevicesMappedApiResponse))
      .catch((error: any) => {
        console.error('Infra', error)
        throw new Error(error.message)
      })
  }

  async getAll (): Promise<EmployeePrimitives[]> {
    return await makeRequest<EmployeePrimitives[]>({ method: 'GET', endpoint: this.endpoint })
    //   .then(res => res.map(data => ({
    //     id: data.id,
    //     serial: data.serial,
    //     activo: data.activo ?? 'Sin Serial',
    //     statusId: data.status.id,
    //     statusName: data.status.name,
    //     categoryId: data.category.id,
    //     categoryName: data.category.name,
    //     brandId: data.brand.id,
    //     brandName: data.brand.name,
    //     modelId: data.model.id,
    //     modelName: data.model.name,
    //     locationId: data.location.id,
    //     locationName: data.location.name,
    //     observation: data.observation,
    //     employeeId: data.employee?.id ?? null,
    //     employeeName: data.employee?.name ?? 'Vacante',
    //     computer: data.computer,
    //     hardDrive: data.hardDrive,
    //     createdAt: data.createdAt,
    //     updatedAt: data.updatedAt
    //   }) satisfies DevicesMappedApiResponse))
  }

  async getById ({ id }: { id: EmployeeId }): Promise<EmployeePrimitives> {
    return await makeRequest<EmployeePrimitives>({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
    //   .then(data => ({
    //     id: data.id,
    //     serial: data.serial,
    //     activo: data.activo ?? '',
    //     statusId: data.status.id,
    //     statusName: data.status.name,
    //     categoryId: data.category.id,
    //     categoryName: data.category.name,
    //     brandId: data.brand.id,
    //     brandName: data.brand.name,
    //     modelId: data.model.id,
    //     modelName: data.model.name,
    //     locationId: data.location.id,
    //     locationName: data.location.name,
    //     observation: data.observation,
    //     employeeId: data.employee?.id ?? null,
    //     employeeName: data.employee?.name ?? '',
    //     computer: data.computer,
    //     hardDrive: data.hardDrive,
    //     createdAt: data.createdAt,
    //     updatedAt: data.updatedAt
    //   } satisfies DevicesMappedApiResponse))
  }
}
