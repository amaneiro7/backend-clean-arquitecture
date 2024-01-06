import { type Response, type NextFunction, type Request } from 'express'

export function authGuard (req: Request, res: Response, next: NextFunction): void {
  console.log(req)
  next()
}
