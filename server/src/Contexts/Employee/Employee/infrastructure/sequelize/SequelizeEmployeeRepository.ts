import { type EmployeePrimitives } from '../../domain/Employee'
import { EmployeeRepository } from '../../domain/EmployeeRepository'
import { EmployeeModel } from './EmployeeSchema'

export class SequelizeEmployeeRepository extends EmployeeRepository {
  async searchAll (): Promise<EmployeePrimitives[]> {
    return await EmployeeModel.findAll()
  }

  async searchById (employeeId: string): Promise<EmployeePrimitives | null> {
    return await EmployeeModel.findByPk(employeeId) ?? null
  }

  async save (payload: EmployeePrimitives): Promise<void> {
    const { id } = payload
    const employee = await EmployeeModel.findByPk(id) ?? null
    if (employee === null) {
      await EmployeeModel.create({ ...payload })
    } else {
      employee.set({ ...payload })
      await employee.save()
    }
  }

  async remove (id: string): Promise<void> {
    await EmployeeModel.destroy({ where: { id } })
  }
}
