import { CategoryService } from '../application/services/category.service'
import { categoryRepositoryInMemory } from '../infrastructure/persistance/local-file-system/category'

export const categoryService = new CategoryService(categoryRepositoryInMemory)
