import { type NextFunction, type Request, type Response } from 'express'

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', 'public, max-age=3600') // Cachear por 1 hora
    next()
}