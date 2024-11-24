import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from '../../Shared/utils/http-status'
import { EmployeeCreator } from '../../../../../Contexts/employee/Employee/application/EmployeeCreator'
import { EmployeeUpdater } from '../../../../../Contexts/employee/Employee/application/EmployeeUpdater'
import { EmployeeRemover } from '../../../../../Contexts/employee/Employee/application/EmployeeRemover'


export class EmployeePostController {
    constructor(private readonly repository: Repository) { }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userName } = req.body
            await new EmployeeCreator(this.repository).run({ userName })
            res.status(httpStatus.CREATED).json({ message: 'Usuario creado exitosamente' })
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userName } = req.body
            const { id } = req.params
            await new EmployeeUpdater(this.repository).run({ id, params: { userName } })
            res.status(httpStatus.CREATED).json({ message: 'Usuario actualizado exitosamente' })
        } catch (error) {
            next(error)
        }
    }

    remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            await new EmployeeRemover(this.repository).run({ id })
            res.status(httpStatus.OK).json({ message: 'Usuario eliminado exitosamente' })
        } catch (error) {
            next(error)
        }
    }
}
