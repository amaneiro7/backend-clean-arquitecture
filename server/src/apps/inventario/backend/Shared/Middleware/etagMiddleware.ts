import { type NextFunction, type Request, type Response } from 'express'
import crypto from 'node:crypto'

export const etagMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const etag = crypto.createHash('md5').update(JSON.stringify(req.body)).digest('hex')
    res.set('ETAG', etag)
    next()
}