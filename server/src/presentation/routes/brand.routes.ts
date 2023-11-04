/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { brandController } from '../../dependecies/brand.dependecies'
import { validatorHandler } from '../../middleware/validatorHandler'
import { createDTO, getIdDTO, updateDTO } from '../dto/dto'

export const brandRouter = Router()

brandRouter.get('/', brandController.getAll)
brandRouter.post('/',
  validatorHandler({ schema: createDTO, property: 'body' }),
  brandController.create)

brandRouter.get('/:id',
  validatorHandler({ schema: getIdDTO, property: 'params' }),
  brandController.getOne)
brandRouter.patch('/:id',
  validatorHandler({ schema: getIdDTO, property: 'params' }),
  validatorHandler({ schema: updateDTO, property: 'body' }),
  brandController.update)
