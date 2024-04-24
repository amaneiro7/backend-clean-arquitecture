import { type CorsOptions } from 'cors'

const whitelist = [
  'http://localhost:3000',
  'http://localhost:9000',
  'http://localhost:5173',
  'http://localhost:8070'
]
export const options: CorsOptions = {
  origin: (origin, callback) => {
    if (origin == null || whitelist.includes(origin) || origin.includes('srvsoporte')) {
      callback(null, true); return
    }
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  preflightContinue: false
}
