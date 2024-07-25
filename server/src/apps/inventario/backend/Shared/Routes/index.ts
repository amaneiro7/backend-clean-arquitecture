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
import { createInputTypeRouter } from '../../ModelSeries/routes/inputType.routes'
import { createEmployeeRouter } from '../../Employee/routes/employee.routes'
import { createHistoryRouter } from '../../History/routes/history.routes'
import { createUserRouter } from '../../User/routes/user.routes'

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
  router.use('/auth', createAuthRouter())
  router.use('/users', authenticate, createUserRouter({ repository }))
  router.use('/check-token', authenticate, validateToken) //
  router.use('/categories', authenticate, createCategoryRouter({ repository }))
  router.use('/brands', authenticate, createBrandRouter({ repository })) //
  router.use('/models', authenticate, createModelSeriesRouter({ repository })) //
  router.use('/devices', authenticate, createDeviceRouter({ repository })) //
  router.use('/status', authenticate, createStatusRouter({ repository })) //
  router.use('/processors', authenticate, createProcessorRouter({ repository })) //
  router.use('/processorsockets', authenticate, createProcessorSocketRouter({ repository }))
  router.use('/memoryramtypes', authenticate, createMemoryRamRouter({ repository }))
  router.use('/harddrivetypes', authenticate, createHardDriveTypeRouter({ repository }))
  router.use('/harddrivecapacities', authenticate, createHardDriveCapacityRouter({ repository }))
  router.use('/operatingsystemarqs', authenticate, createOperatingSystemArqRouter({ repository })) //
  router.use('/operatingsystems', authenticate, createOperatingSystemVersionsRouter({ repository })) //
  router.use('/inputtypes', authenticate, createInputTypeRouter({ repository }))
  router.use('/cities', authenticate, createCityRouter({ repository }))
  router.use('/states', authenticate, createStateRouter({ repository }))
  router.use('/regions', authenticate, createRegionRouter({ repository }))
  router.use('/sites', authenticate, createSiteRouter({ repository }))
  router.use('/locations', authenticate, createLocationRouter({ repository }))
  router.use('/typeofsites', authenticate, createTypeOfSiteRouter({ repository }))
  router.use('/cargos', authenticate, createCargoRouter({ repository }))
  router.use('/coordinaciones', authenticate, createCoordinacionRouter({ repository }))
  router.use('/gerencias', authenticate, createGerenciaRouter({ repository }))
  router.use('/vicepresidencias', authenticate, createVicepresidenciaRouter({ repository }))
  router.use('/vicepresidenciasejecutivas', authenticate, createVicepresidenciaEjecutivaRouter({ repository }))
  router.use('/employees', authenticate, createEmployeeRouter({ repository }))
  router.use('/histories', authenticate, createHistoryRouter({ repository }))

  // router.use('/users', createUserRouter({ router, repository }))
  // router.use('/profiles', createProfileRouter({ router, repository }))
  router.use((err: Error, req: Request, res: Response, _next: () => void) => {
    console.log(err)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  })
  return router
}
