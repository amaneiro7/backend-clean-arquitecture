import httpStatus from 'http-status'
import { type Application, Router, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

import { createCategoryRouter } from '../../Category/routes/category.routes'
import { createBrandRouter } from '../../Brand/routes/brand.routes'
import { createModelSeriesRouter } from '../../ModelSeries/routes/modelSeries.routes'
import { createStatusRouter } from '../../Device/routes/status.routes'
import { createDeviceRouter } from '../../Device/routes/device.routes'
import { createAuthRouter } from '../../Auth/routes/auth.routes'
import { createProcessorRouter } from '../../Features/Processor/routes/processor.routes'
import { createMemoryRamRouter } from '../../Features/MemoryRam/routes/memoryRam.routes'
import { createHardDriveTypeRouter } from '../../Features/HardDrive/routes/hardDriveType.routes'
import { createHardDriveCapacityRouter } from '../../Features/HardDrive/routes/hardDriveCapacity.routes'
import { createOperatingSystemArqRouter } from '../../Features/OperatingSystem/routes/operatingSystemArq.routes'
import { createOperatingSystemVersionsRouter } from '../../Features/OperatingSystem/routes/operatingSystemVersions.routes'
import { authenticate } from '../Middleware/authenticate'
import { validateToken } from '../Middleware/validateTokenHttpOnly'
import { createProcessorSocketRouter } from '../../Features/Processor/routes/processorSocket.routes'
import { createCityRouter } from '../../Location/routes/city.routes'
import { createStateRouter } from '../../Location/routes/state.routes'
import { createTypeOfSiteRouter } from '../../Location/routes/typeOfSite.routes'
import { createRegionRouter } from '../../Location/routes/region.routes'
import { createSiteRouter } from '../../Location/routes/site.routes'
import { createLocationRouter } from '../../Location/routes/location.routes'
import { createCargoRouter } from '../../Employee/routes/cargo.routes'
import { createCoordinacionRouter } from '../../Employee/routes/coordinacion.routes'
import { createGerenciaRouter } from '../../Employee/routes/gerencia.routes'
import { createVicepresidenciaRouter } from '../../Employee/routes/vicepresidencia.routes'
import { createVicepresidenciaEjecutivaRouter } from '../../Employee/routes/vicepresidenciaEjecutiva.routes'

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
  router.use('/check-token', authenticate, validateToken)
  router.use('/categories', createCategoryRouter({ repository }))
  router.use('/brands', createBrandRouter({ repository }))
  router.use('/models', createModelSeriesRouter({ repository }))
  router.use('/devices', createDeviceRouter({ repository }))
  router.use('/status', createStatusRouter({ repository }))
  router.use('/processors', createProcessorRouter({ repository }))
  router.use('/processorsockets', createProcessorSocketRouter({ repository }))
  router.use('/auth', createAuthRouter())
  router.use('/memoryramtypes', createMemoryRamRouter({ repository }))
  router.use('/harddrivetypes', createHardDriveTypeRouter({ repository }))
  router.use('/harddrivecapacities', createHardDriveCapacityRouter({ repository }))
  router.use('/operatingsystemarqs', createOperatingSystemArqRouter({ repository }))
  router.use('/operatingsystems', createOperatingSystemVersionsRouter({ repository }))
  router.use('/cities', createCityRouter({ repository }))
  router.use('/states', createStateRouter({ repository }))
  router.use('/regions', createRegionRouter({ repository }))
  router.use('/sites', createSiteRouter({ repository }))
  router.use('/locations', createLocationRouter({ repository }))
  router.use('/typeofsites', createTypeOfSiteRouter({ repository }))
  router.use('/cargos', createCargoRouter({ repository }))
  router.use('/coordinaciones', createCoordinacionRouter({ repository }))
  router.use('/gerencias', createGerenciaRouter({ repository }))
  router.use('/vicepresidencias', createVicepresidenciaRouter({ repository }))
  router.use('/vicepresidenciasejecutivas', createVicepresidenciaEjecutivaRouter({ repository }))

  // router.use('/users', createUserRouter({ router, repository }))
  // router.use('/profiles', createProfileRouter({ router, repository }))
  router.use((err: Error, req: Request, res: Response, _next: () => void) => {
    console.log(err)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  })
  return router
}
