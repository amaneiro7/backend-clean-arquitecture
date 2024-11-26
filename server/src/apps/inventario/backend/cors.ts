import { type CorsOptions } from 'cors'

const whitelist = [
  'http://localhost:3000',
  'http://localhost:9000',
  'http://localhost:5173',
  'http://localhost:8070',
  'http://10.0.12.106:8070',
  'http://10.0.12.113:8070',
  'mandev',
  'srvsocker',
]
export const options: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin)
    if (origin == null || whitelist.includes(origin) || origin.includes('srvsoporte') || origin.includes('devtunnels')) {
      callback(null, true); return
    }
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  preflightContinue: false
}
