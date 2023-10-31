import { Router } from 'express'
import { brandController } from '../../dependecies/brand.dependecies'

export const brandRouter = Router()

brandRouter.get('/', brandController.getAll.bind(brandController))
brandRouter.post('/', brandController.create.bind(brandController))

brandRouter.get('/:id', brandController.getOne.bind(brandController))
brandRouter.patch('/:id', brandController.update.bind(brandController))
