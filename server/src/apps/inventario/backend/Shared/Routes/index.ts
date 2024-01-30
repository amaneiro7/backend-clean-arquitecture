import httpStatus from 'http-status'
import { type Application, Router, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

import { createCategoryRouter } from '../../Category/routes/category.routes'
import { createBrandRouter } from '../../Brand/routes/brand.routes'
import { createModelSeriesRouter } from '../../ModelSeries/routes/modelSeries.routes'
import { createStatusRouter } from '../../Device/routes/status.routes'
import { createDeviceRouter } from '../../Device/routes/device.routes'
import { createAuthRouter } from '../../Auth/routes/auth.routes'

// import { createUserRouter } from './user.routes'
// import { createAuthRouter } from './auth.routes'
// import { createProfileRouter } from './profile.routes'

interface Props {
  app: Application
  repository: Repository
  // emailAdapter: EmailAdapter
}
export const routerApi = ({ app, repository }: Props): Router => {
  const router = Router()
  app.use('/api/v1/', router)
  router.use('/categories', createCategoryRouter({ repository }))
  router.use('/brands', createBrandRouter({ repository }))
  router.use('/models', createModelSeriesRouter({ repository }))
  router.use('/devices', createDeviceRouter({ repository }))
  router.use('/status', createStatusRouter({ repository }))
  router.use('/auth', createAuthRouter())
  // router.use('/users', createUserRouter({ router, repository }))
  // router.use('/profiles', createProfileRouter({ router, repository }))
  router.use((err: Error, req: Request, res: Response, _next: () => void) => {
    console.log(err)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  })
  return router
}
