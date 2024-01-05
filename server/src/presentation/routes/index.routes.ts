import { Router, type Application } from 'express'
import { categoryRouter } from './category.routes'
import { modelSeriesRouter } from './modelSeries.routes'
import { createStatusRouter } from './status.routes'
import { deviceRouter } from './device.routes'
import { createBrandRouter } from './brand.routes'
import { userRouter } from './user.routes'
import { type Repository } from '../../domain/repositories/respoitory'

export const routerApi = (app: Application, repository: Repository): Router => {
  const router = Router()

  app.use('/api/v1/', router)
  router.use('/categories', categoryRouter)
  router.use('/brands', createBrandRouter(repository))
  router.use('/models', modelSeriesRouter)
  router.use('/device', deviceRouter)
  router.use('/status', createStatusRouter())
  router.use('/users', userRouter)

  return router
}
