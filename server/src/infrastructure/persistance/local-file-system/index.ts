import { brandRepositoryInMemory } from './brand'
import { categoryRepositoryInMemory } from './category'
import { modelRepositoryInMemory } from './modelSeries'
import { userRepositoryInMemory } from './user'

export const storeInMemory = {
  user: userRepositoryInMemory,
  brand: brandRepositoryInMemory,
  category: categoryRepositoryInMemory,
  modelSeries: modelRepositoryInMemory,
  device: userRepositoryInMemory
}
