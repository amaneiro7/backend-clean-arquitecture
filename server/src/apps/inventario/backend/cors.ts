import { type CorsOptions } from 'cors'

const whitelist = [
  'http://localhost:3000',
  'http://localhost:9000',
  'http://localhost:5173'
]
export const options: CorsOptions = {
  origin: (origin, callback) => {
    if (origin == null) {
      callback(null, true); return
    }
    if (whitelist.includes(origin)) {
      callback(null, true); return
    }

    callback(new Error('Not allowed by CORS'))
  }
}

// otra forma de administrar los cors de forma manual
// app.options('/api/v2/items', (req, res) => {
//     const origin = req.header('origin')

//     if (whitelist.includes(origin) || !origin) {
//         res.header("Access-Control-Allow-Origin", origin) // permite cualquier dominio para consumir la api
//         res.header("Access-Control-Allow-Methos", "GET, POST,PUT,PACTH, DELETE")
//     }
//     res.send(200)
// })
