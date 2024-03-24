import { type Primitives } from '../../Shared/domain/value-object/Primitives'
import { BrandId } from './BrandId'
import { BrandName } from './BrandName'

export interface BrandPrimitives {
  id: Primitives<BrandId>
  name: Primitives<BrandName>
}

export class Brand {
  constructor (
    private readonly id: BrandId,
    private name: BrandName
  ) {}

  static create ({ name }: Omit<BrandPrimitives, 'id'>): Brand {
    const id = BrandId.random().value
    return new Brand(
      new BrandId(id),
      new BrandName(name)
    )
  }

  updateName (newName: Primitives<BrandName>): void {
    this.name = new BrandName(newName)
  }

  static fromPrimitives (primitives: BrandPrimitives): Brand {
    return new Brand(
      new BrandId(primitives.id),
      new BrandName(primitives.name)
    )
  }

  toPrimitive (): BrandPrimitives {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): Primitives<BrandId> {
    return this.id.value
  }

  get nameValue (): Primitives<BrandName> {
    return this.name.value
  }
}
