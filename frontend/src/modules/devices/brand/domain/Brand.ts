import { BrandId } from './BrandId'
import { BrandName } from './BrandName'

export interface BrandPrimitives {
  id: string
  name: string
}
export class Brand {
  constructor (
    private readonly id: BrandId,
    private readonly name: BrandName
  ) {}

  public static create ({ id, name }: BrandPrimitives): Brand {
    return new Brand(new BrandId(id), new BrandName(name))
  }

  idValue (): string {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): BrandPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
