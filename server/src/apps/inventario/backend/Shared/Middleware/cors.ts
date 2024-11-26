import { type CorsOptions } from 'cors'
import { whitelist } from './whitelist'


export const options: CorsOptions = {
  origin: (origin, callback) => {
    const validorigin = whitelist.some(domain => origin?.includes(domain))
    
    if (!origin || validorigin || origin?.includes('devtunnels')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    // 'Access-Control-Allow-Credentials', 
    // 'Access-Control-Allow-Origin'
  ],
  exposedHeaders: [
    'Content-Type', 
    'Authorization', 
    // 'Access-Control-Allow-Credentials', 
    // 'Access-Control-Allow-Origin'
  ]
  
}
