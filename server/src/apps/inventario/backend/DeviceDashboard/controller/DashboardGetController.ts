import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { DeviceCounByCategory } from '../../../../../Contexts/Device/Inventroy/application/DeviceCountByCategory'
import { TotalDeviceCount } from '../../../../../Contexts/Device/Inventroy/application/TotalDeviceCount'
import { DeviceCounByOperatingSystem } from '../../../../../Contexts/Device/Inventroy/application/DeviceCountByOperatingSystem'
import { Dashboard } from '../../../../../Contexts/Device/Inventroy/application/Dashboard'

export class DashboardGetController {
    constructor(private readonly repository: Repository) { }
    dashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await new Dashboard(this.repository).run()
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
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
    countByOperatingSystem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await new DeviceCounByOperatingSystem(this.repository).run()
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
}
