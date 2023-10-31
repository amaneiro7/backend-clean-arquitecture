import { Router } from 'express'
import { categoryController } from '../../dependecies/category.dependecies'

export const categoryRouter = Router()

categoryRouter.get('/', categoryController.getAll.bind(categoryController))
categoryRouter.get('/:id', categoryController.getOne.bind(categoryController))
