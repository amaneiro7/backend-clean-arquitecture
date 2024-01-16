import { BrandId } from './BrandId'
import { BrandName } from './BrandName'

export interface BrandPrimitives {
  id: string
  name: string
}

export class Brand {
  constructor (
    private readonly _id: BrandId,
    private _name: BrandName
  ) {}

  static create ({ name }: { name: string }): Brand {
    const id = String(BrandId.random())
    return new Brand(
      new BrandId(id),
      new BrandName(name)
    )
  }

  updateName (newName: string): void {
    this._name = new BrandName(newName)
  }

  static fromPrimitives (primitives: BrandPrimitives): Brand {
    return new Brand(
      new BrandId(primitives.id),
      new BrandName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this._id.value,
      name: this._name.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get name (): string {
    return this._name.value
  }
}
