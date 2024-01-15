import { type Application, Router, type Request, type Response } from 'express'
// import { createCategoryRouter } from './category.routes'
// import { createModelSeriesRouter } from './modelSeries.routes'
// import { createStatusRouter } from './status.routes'
// import { createDeviceRouter } from './device.routes'
import { createBrandRouter } from '../Brand/routes/brand.routes'
// import { createUserRouter } from './user.routes'
// import { createAuthRouter } from './auth.routes'
// import { createProfileRouter } from './profile.routes'
import { type Repository } from '../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'

interface Props {
  app: Application
  repository: Repository
  // emailAdapter: EmailAdapter
}
export const routerApi = ({ app, repository }: Props): Router => {
  const router = Router()
  app.use('/api/v1/', router)
  // router.use('/categories', createCategoryRouter({ router, repository }))
  router.use('/brands', createBrandRouter({ repository }))
  // router.use('/models', createModelSeriesRouter({ router, repository }))
  // router.use('/device', createDeviceRouter({ router, repository }))
  // router.use('/status', createStatusRouter({ router }))
  // router.use('/auth', createAuthRouter({ router, repository }))
  // router.use('/users', createUserRouter({ router, repository }))
  // router.use('/profiles', createProfileRouter({ router, repository }))
  router.use((err: Error, req: Request, res: Response, _next: () => void) => {
    console.log(err)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  })
  return router
}
