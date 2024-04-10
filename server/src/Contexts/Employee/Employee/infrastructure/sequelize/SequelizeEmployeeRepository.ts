import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { type EmployeePrimitives } from '../../domain/Employee'
import { type EmployeeRepository } from '../../domain/EmployeeRepository'
import { EmployeeModel } from './EmployeeSchema'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'

export class SequelizeEmployeeRepository extends CriteriaToSequelizeConverter<EmployeeModel> implements EmployeeRepository {
  private readonly models = sequelize.models as unknown as Models
  async searchAll (): Promise<EmployeePrimitives[]> {
    return await EmployeeModel.findAll()
  }

  async matching (criteria: Criteria): Promise<EmployeePrimitives[]> {
    const options = this.convert(criteria)
    options.include = [
      'cargo',
      'location',
      'vicepresidenciaEjecutiva',
      'vicepresidencia',
      'gerencia',
      'coordinacion'
    ]
    return await EmployeeModel.findAll(options)
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
