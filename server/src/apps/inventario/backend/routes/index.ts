import { type Router } from 'express'
// import { createCategoryRouter } from './category.routes'
// import { createModelSeriesRouter } from './modelSeries.routes'
// import { createStatusRouter } from './status.routes'
// import { createDeviceRouter } from './device.routes'
import { createBrandRouter } from './brand.routes'
// import { createUserRouter } from './user.routes'
// import { createAuthRouter } from './auth.routes'
// import { createProfileRouter } from './profile.routes'
import { type Repository } from '../../../../Contexts/Shared/domain/Repository'

interface Props {
  router: Router
  repository: Repository
  // emailAdapter: EmailAdapter
}
export const routerApi = ({ router, repository }: Props): Router => {
  // router.use('/categories', createCategoryRouter({ router, repository }))
  router.use('/brands', createBrandRouter({ router, repository }))
  // router.use('/models', createModelSeriesRouter({ router, repository }))
  // router.use('/device', createDeviceRouter({ router, repository }))
  // router.use('/status', createStatusRouter({ router }))
  // router.use('/auth', createAuthRouter({ router, repository }))
  // router.use('/users', createUserRouter({ router, repository }))
  // router.use('/profiles', createProfileRouter({ router, repository }))

  return router
}
