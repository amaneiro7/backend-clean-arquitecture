import { Router, type Express } from 'express'
import { categoryRouter } from './category.routes'
import { brandRouter } from './brand.routes'
import { modelSeriesRouter } from './modelSeries.routes'
import { statusRouter } from './status.routes'

export function routerApi (app: Express): void {
  const router = Router()

  app.use('/api/v1/', router)
  router.use('/categories', categoryRouter)
  router.use('/brands', brandRouter)
  router.use('/models', modelSeriesRouter)
  router.use('/status', statusRouter)
}
