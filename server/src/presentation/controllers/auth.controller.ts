import { type NextFunction, type Request, type Response } from 'express'
import { successResponses } from '../../utils/successResponse'
import { type UserOutput } from '../../domain/entities/User/user.entity'
import { sendRecovery } from '../../application/send-recovery/sendRecovery'
import { type Repository } from '../../domain/repositories/respoitory'
import { type EmailAdapter } from '../../domain/adapters/email.adapter'

export class AuthController {
  constructor (
    private readonly repository: Repository,
    private readonly emailAdapter: EmailAdapter
  ) {}

  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.user as UserOutput
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  sendRecovery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body
      const data = await sendRecovery({ email, repository: this.repository, emailAdapter: this.emailAdapter })
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }
}
