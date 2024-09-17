import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { DeviceCounByCategory } from '../../../../../Contexts/Device/Inventroy/application/DeviceCountByCategory'
import { TotalDeviceCount } from '../../../../../Contexts/Device/Inventroy/application/TotalDeviceCount'

export class DashboardGetController {
    constructor(private readonly repository: Repository) { }
    totalDevice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await new TotalDeviceCount(this.repository).run()
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
    countByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await new DeviceCounByCategory(this.repository).run()
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
}
