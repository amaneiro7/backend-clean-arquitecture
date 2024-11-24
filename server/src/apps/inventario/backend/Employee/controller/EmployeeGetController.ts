import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { type FiltersPrimitives } from '../../../../../Contexts/Shared/domain/criteria/Filter'
import { EmployeeByCriteriaSearcher } from '../../../../../Contexts/employee/Employee/application/EmployeeByCriteriaSearcher'
import { SearchByCriteriaQuery } from '../../../../../Contexts/Shared/domain/SearchByCriteriaQuery'
import { EmployeeFinder } from '../../../../../Contexts/employee/Employee/application/EmployeeFInder'
import { SearchAllEmployees } from '../../../../../Contexts/Device/Device/application/DeviceFinderAll'
import { EmployeesApiResponse } from '../../../../../Contexts/employee/Employee/infrastructure/sequelize/EmployeeResponse'

export class EmployeeGetController {
  constructor(private readonly repository: Repository) { }

  getByCriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filters, orderBy, orderType, limit, offset } = req.query
      const query = new SearchByCriteriaQuery(
        filters ? filters as unknown as FiltersPrimitives[] : [],
        orderBy ? orderBy as string : undefined,
        orderType ? orderType as string : undefined,
        limit ? Number(limit) : undefined,
        offset ? Number(offset) : undefined
      )
      const data = await new EmployeeByCriteriaSearcher(this.repository).search(query)
      const dataMapped = (data as unknown as EmployeesApiResponse[]).map((data) => ({
        id: data.id,
        userName: data.userName,
        computers: data.devices.filter(device => ['Computadoras', 'Servidores', 'Laptops', 'All in One'].includes(device.category.name)),
        monitores: data.devices.filter(device => device.category.name === 'Monitores'),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }))
      res.status(httpStatus.OK).json(dataMapped)
    } catch (error) {
      next(error)
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllEmployees(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new EmployeeFinder(this.repository).searchById(id)
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
