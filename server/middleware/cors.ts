import cors, { type CorsRequest } from 'cors'
import { type Response, type NextFunction } from 'express'
// import express from 'express'
// const app = express()
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:9000',
  'http://localhost:5173'
]
interface CorsMiddlewareOptions {
  acceptedOrigins?: string[]
}

type CorsMiddleware = (options?: CorsMiddlewareOptions) => (req: CorsRequest, res: Response, next: NextFunction) => void

export const corsMiddleware: CorsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (origin == null) {
      callback(null, true); return
    }

    if (acceptedOrigins.includes(origin)) {
      callback(null, true); return
    }

    callback(new Error('Not allowed by Cors'))
  }
})

// otra forma de administrar los cors de forma manual
// app.options('/api/v2/items', (req, res) => {
//     const origin = req.header('origin')

//     if (whitelist.includes(origin) || !origin) {
//         res.header("Access-Control-Allow-Origin", origin) // permite cualquier dominio para consumir la api
//         res.header("Access-Control-Allow-Methos", "GET, POST,PUT,PACTH, DELETE")
//     }
//     res.send(200)
// })
