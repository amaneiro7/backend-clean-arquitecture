import { Router, type Application } from 'express'
import { type Repository } from '../../domain/repositories/respoitory'
import { createCategoryRouter } from './category.routes'
import { createModelSeriesRouter } from './modelSeries.routes'
import { createStatusRouter } from './status.routes'
import { createDeviceRouter } from './device.routes'
import { createBrandRouter } from './brand.routes'
import { createUserRouter } from './user.routes'
import { createAuthRouter } from './auth.routes'
import { type EmailAdapter } from '../../domain/adapters/email.adapter'
import { createProfileRouter } from './profile.routes'

interface Props {
  app: Application
  repository: Repository
  emailAdapter: EmailAdapter
}
export const routerApi = ({ app, repository, emailAdapter }: Props): Router => {
  const router = Router()

  app.use('/api/v1/', router)
  router.use('/categories', createCategoryRouter({ repository }))
  router.use('/brands', createBrandRouter({ repository }))
  router.use('/models', createModelSeriesRouter({ repository }))
  router.use('/device', createDeviceRouter({ repository }))
  router.use('/status', createStatusRouter())
  router.use('/auth', createAuthRouter({ repository, emailAdapter }))
  router.use('/users', createUserRouter({ repository }))
  router.use('/profiles', createProfileRouter({ repository }))

  return router
}
