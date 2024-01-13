import { type Category } from '../../domain/Category'

interface CategoryResponse {
  id: string
  name: string
}

export class CategoriesResponse {
  public readonly categories: CategoryResponse[]
  constructor (categories: Category[]) {
    this.categories = categories.map(category => category.toPrimitive())
  }
}
