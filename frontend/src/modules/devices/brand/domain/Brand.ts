import { BrandName } from './BrandName'

export interface BrandPrimitives {
  id?: string
  name: string
}
export class Brand {
  constructor (
    private readonly name: BrandName
  ) {}

  public static create ({ name }: BrandPrimitives): Brand {
    return new Brand(new BrandName(name))
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): BrandPrimitives {
    return {
      name: this.nameValue()
    }
  }
}
