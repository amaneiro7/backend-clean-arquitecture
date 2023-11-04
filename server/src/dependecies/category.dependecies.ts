import { CategoryService } from '../application/services/category.service'
import { CategoryRepositoryInMemory } from '../infrastructure/persistance/local-file-system/category'
import { CategoryController } from '../presentation/controllers/category.controller'

export const categoryRepository = new CategoryRepositoryInMemory()

export const categoryService = new CategoryService(categoryRepository)

export const categoryController = new CategoryController(categoryService)
