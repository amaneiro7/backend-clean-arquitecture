import { type NextFunction, type Request, type Response } from 'express'
import crypto from 'node:crypto'

export const etagMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send

    res.send = function (body) {
        // Convertir el body a string si no lo es
        const bodyString = typeof body === 'string' ? body : JSON.stringify(body)

        // generar ETag basado en el contenido del body
        const eTag = generateETag(bodyString)
        res.set('ETAG', eTag)

        return originalSend.call(this, body)
    }
    next()
}

const generateETag = (body: string): string => {
    const hash = crypto.createHash('md5').update(body).digest('hex')
    return `"${hash}"`
}