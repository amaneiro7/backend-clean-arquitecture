import { Request, Response, NextFunction } from 'express'


export const expiresMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const now = new Date()
    const oneHourInMilliseconds = 3600 * 1000
    const expiresTime = new Date(now.getTime() + oneHourInMilliseconds).toUTCString()
    res.set('Expires', expiresTime)
    next()
}
