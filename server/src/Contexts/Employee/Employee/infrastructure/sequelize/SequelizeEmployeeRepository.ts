import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { type EmployeePrimitives } from '../../domain/Employee'
import { type EmployeeRepository } from '../../domain/EmployeeRepository'
import { EmployeeModel } from './EmployeeSchema'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { DeviceAssociation } from './DeviceAssociation'


export class SequelizeEmployeeRepository extends CriteriaToSequelizeConverter implements EmployeeRepository {
  private readonly models = sequelize.models as unknown as Models
  async searchAll (): Promise<EmployeePrimitives[]> {
    return await EmployeeModel.findAll()
  }

  async matching (criteria: Criteria): Promise<EmployeePrimitives[]> {
    const options = this.convert(criteria)
    const locationJoin = new DeviceAssociation().convertFilterLocation(criteria, options)    
    console.log('matching',locationJoin)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment  

    // if (criteria.searchValueInArray('typeOfSite')) {
    //   options.include.push({
    //     association: 'devices',
    //     include: [
    //       'category',
    //       'brand',
    //       'model',
    //       {
    //         association: 'computer',
    //         include: ['processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
    //       },
    //       {
    //         association: 'hardDrive',
    //         include: ['hardDriveCapacity', 'hardDriveType']
    //       },
    //       {
    //         association: 'location',
    //         include: [
    //           'typeOfSite',
    //           { association: 'site', include: [{ association: 'city', include: [{ association: 'state', include: ['region'] }] }] }
    //         ],
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-expect-error
    //         where: { typeOfSiteId: options.where.typeOfSite }
    //       }
    //     ]
    //   })
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-expect-error
    //   delete options.where.typeOfSite
    // } else {
    //   options.include.push({
    //     association: 'devices',
    //     include: [
    //       'category',
    //       'brand',
    //       'model',
    //       {
    //         association: 'computer',
    //         include: ['processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
    //       },
    //       {
    //         association: 'hardDrive',
    //         include: ['hardDriveCapacity', 'hardDriveType']
    //       },
    //       {
    //         association: 'location',
    //         include: [
    //           'typeOfSite',
    //           { association: 'site', include: [{ association: 'city', include: [{ association: 'state', include: ['region'] }] }] }
    //         ]
    //       }
    //     ]
    //   })
    // }
    return await EmployeeModel.findAll(locationJoin)
  }

  async searchById (employeeId: string): Promise<EmployeePrimitives | null> {
    return await EmployeeModel.findByPk(employeeId) ?? null
  }

  async searchByUserName(userName: string): Promise<EmployeePrimitives | null> {
    return await EmployeeModel.findOne({ where: { userName } })
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
