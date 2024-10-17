import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CategoryId } from '../../Category/domain/MainCategoryId'
import { CategoryId } from './CategoryId'
import { CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: Primitives<CategoryId>
  name: Primitives<CategoryName>
  categoryId: Primitives<CategoryId>
}

export const CategoryValues = {
  COMPUTADORAS: '1',
  SERVIDORES: '2',
  LAPTOPS: '3',
  ALLINONE: '4',
  MONITORES: '5',
  FINANCIERASPRINTER: '6',
  LASERPRINTER: '7',
  INKPRINTER: '8',
  HARDDRIVE: '9',
  KEYBOARD: '10',
  MOUSE: '11',
  BAM: '12',
  MFP: '13',
  PHONES: '14',
  SCANNER: '15',
  ANTENAS: '16',
  CABLEUSB: '17',
  CAMARAS: '18',
  IPAD: '19',
  WEBCAM: '20',
  CORNETAS: '21',
  DOCKING: '22',
  LAPIZOPTICO: '23',
  CONVERTIDORVGAHDMI: '24',
  MIC: '25',
} as const

export class Category {
  constructor(
    private readonly id: CategoryId,
    private readonly name: CategoryName,
    private readonly categoryId: CategoryId
  ) { }

  static fromPrimitives(primitives: CategoryPrimitives): Category {
    return new Category(
      new CategoryId(primitives.id),
      new CategoryName(primitives.name),
      new CategoryId(primitives.categoryId),
    )
  }

  toPrimitive(): CategoryPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      categoryId: this.categoryId.value
    }
  }

  get idValue(): Primitives<CategoryId> {
    return this.id.value
  }

  get nameValue(): Primitives<CategoryName> {
    return this.name.value
  }

  get categoryIdValue(): Primitives<CategoryId> {
    return this.categoryId.value
  }
}
