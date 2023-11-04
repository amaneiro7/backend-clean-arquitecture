import { Router } from 'express'
import { categoryController } from '../../dependecies/category.dependecies'
import { validatorHandler } from '../../middleware/validatorHandler'
import { getIdDTO } from '../dto/dto'

export const categoryRouter = Router()

categoryRouter.get('/', categoryController.getAll.bind(categoryController))
categoryRouter.get('/:id', validatorHandler({ schema: getIdDTO, property: 'params' }),
  categoryController.getOne.bind(categoryController))
