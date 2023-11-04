import express, { type Application } from 'express'
import Server from './src'

const app: Application = express()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server: Server = new Server(app)
const port: number = 3000

app.listen(port, () => {
  console.info(`Server Running on port ${port}`)
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Server startup error: address already in use')
  } else {
    console.log(err)
  }
})
