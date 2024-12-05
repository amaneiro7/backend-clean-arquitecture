import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from '../../Shared/utils/http-status'
import { UserFinder } from '../../../../../Contexts/User/user/application/UserFinder'
import { JwtPayloadUser } from '../../../../../Contexts/Auth/domain/GenerateToken'
import { SearchByCriteriaQuery } from '../../../../../Contexts/Shared/domain/SearchByCriteriaQuery'
import { FiltersPrimitives } from '../../../../../Contexts/Shared/domain/criteria/Filter'
import { UserByCriteriaSearcher } from '../../../../../Contexts/User/user/application/UserByCriteriaSearcher'
import { UserFinderAll } from '../../../../../Contexts/User/user/application/UserFinderAll'


export class UserGetController {
    constructor(private readonly repository: Repository) { }

    getByCriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user as JwtPayloadUser
            const { filters, orderBy, orderType, limit, offset } = req.query
            const query = new SearchByCriteriaQuery(
                filters ? filters as unknown as FiltersPrimitives[] : [],
                orderBy ? orderBy as string : undefined,
                orderType ? orderType as string : undefined,
                limit ? Number(limit) : undefined,
                offset ? Number(offset) : undefined
            )
            const data = await new UserByCriteriaSearcher(this.repository).search({ user, query })
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user as JwtPayloadUser
            const data = await new UserFinderAll(this.repository).search({ user })
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user as JwtPayloadUser
            const { id } = req.params
            const data = await new UserFinder(this.repository).searchById({ id, user })
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
    getByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user as JwtPayloadUser
            const { email } = req.body
            const data = await new UserFinder(this.repository).searchByEmail({ userEmail: email, user })
            res.status(httpStatus.OK).json(data)
        } catch (error) {
            next(error)
        }
    }
}
