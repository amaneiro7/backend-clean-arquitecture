import { type Request, type Response, type NextFunction } from 'express'

export function loggerMiddleware (req: Request, res: Response, next: NextFunction): void {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}
