import { type CorsOptions } from 'cors'

const whitelist = [
  'localhost',  
  '10.0.12.106',
  '10.0.12.113',
  '10.0.11.111',
  'mandev',
  'srvdocker',
]
export const options: CorsOptions = {
  origin: (origin, callback) => {
    const validorigin = whitelist.some(domain => origin?.includes(domain))
    
    if (origin == null || validorigin || origin?.includes('devtunnels')) {
      callback(null, true); return
    }
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  preflightContinue: false
}
