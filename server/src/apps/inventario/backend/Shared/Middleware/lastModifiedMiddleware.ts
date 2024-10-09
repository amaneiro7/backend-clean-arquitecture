import { Request, Response, NextFunction } from 'express'

export const lastModifiedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const now = new Date()
    const lastModified = now.toUTCString()
    res.set('Last-Modified', lastModified)
    next()
}
