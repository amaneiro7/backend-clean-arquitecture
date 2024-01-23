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

  static create ({ name }: { name: string }): Brand {
    const id = String(BrandId.random())
    return new Brand(
      new BrandId(id),
      new BrandName(name)
    )
  }

  updateName (newName: string): void {
    this.name = new BrandName(newName)
  }

  static fromPrimitives (primitives: BrandPrimitives): Brand {
    return new Brand(
      new BrandId(primitives.id),
      new BrandName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
