import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { DeviceCounByCategory } from '../../../../../Contexts/Device/Inventroy/application/DeviceCountByCategory'

export class DashboardGetController {
    constructor(private readonly repository: Repository) { }
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await new DeviceCounByCategory(this.repository).run()
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
}
