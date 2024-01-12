import { BrandId } from './BrandId'
import { BrandName } from './BrandName'

export interface BrandPrimitives {
  id: string
  name: string
}

export class Brand {
  constructor (
    private readonly id: BrandId,
    private name: BrandName
  ) {}

  static create ({ id, name }: { id: string, name: string }): Brand {
    return new Brand(
      new BrandId(id),
      new BrandName(name)
    )
  }

  static fromPrimitives (primitives: BrandPrimitives): Brand {
    return new Brand(
      new BrandId(primitives.id),
      new BrandName(primitives.name)
    )
  }

  updateName (newName: string): void {
    this.name = new BrandName(newName)
  }

  get IdValue (): string {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
