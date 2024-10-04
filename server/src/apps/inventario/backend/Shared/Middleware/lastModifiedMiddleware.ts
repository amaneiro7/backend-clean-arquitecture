import { Request, Response, NextFunction } from 'express'

export const lastModifiedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const lastModified = new Date().toUTCString()
    res.set('Last-Modified', lastModified)
    next()
}
