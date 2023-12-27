import { Router, type Application } from 'express'
import { categoryRouter } from './category.routes'
import { modelSeriesRouter } from './modelSeries.routes'
import { statusRouter } from './status.routes'
import { deviceRouter } from './device.routes'
import { brandRouter } from './brand.routes'
import { userRouter } from './user.routes'

export default class Routes {
  router = Router()
  constructor (app: Application) {
    app.use('/api/v1/', this.router)
    this.router.use('/categories', categoryRouter)
    this.router.use('/brands', brandRouter)
    this.router.use('/models', modelSeriesRouter)
    this.router.use('/device', deviceRouter)
    this.router.use('/status', statusRouter)
    this.router.use('/users', userRouter)
  }
}
