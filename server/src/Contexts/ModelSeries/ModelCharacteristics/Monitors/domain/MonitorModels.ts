import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'
import { HasDVI } from './HasDVI'
import { HasHDMI } from './HasHDMI'
import { HasVGA } from './HasVGA'
import { MonitorScreenSize } from './MonitorScreenSize'

export interface MonitorModelsPrimitives extends ModelSeriesPrimitives {
  screenSize: Primitives<MonitorScreenSize>
  hasDVI: Primitives<HasDVI>
  hasHDMI: Primitives<HasHDMI>
  hasVGA: Primitives<HasVGA>
}
export class MonitorModels extends ModelSeries {
  constructor (
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    private readonly screenSize: MonitorScreenSize,
    private readonly hasDVI: HasDVI,
    private readonly hasHDMI: HasHDMI,
    private readonly hasVGA: HasVGA
  ) {
    super(id, name, categoryId, brandId)
  }

  static create ({
    name,
    categoryId,
    brandId,
    screenSize,
    hasDVI,
    hasHDMI,
    hasVGA
  }: Omit<MonitorModelsPrimitives, 'id'>): MonitorModels {
    const id = String(ModelSeriesId.random())
    return new MonitorModels(
      new ModelSeriesId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new MonitorScreenSize(screenSize),
      new HasDVI(hasDVI),
      new HasHDMI(hasHDMI),
      new HasVGA(hasVGA)
    )
  }

  public static isMonitorCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedMonitorCategories: CategoryValues[] = ['Monitores']
    return AcceptedMonitorCategories.includes(CategoryDefaultData[categoryId])
  }

  static fromPrimitives (primitives: MonitorModelsPrimitives): MonitorModels {
    return new MonitorModels(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new MonitorScreenSize(primitives.screenSize),
      new HasDVI(primitives.hasDVI),
      new HasHDMI(primitives.hasHDMI),
      new HasVGA(primitives.hasVGA)
    )
  }

  toPrimitives (): MonitorModelsPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      screenSize: this.screenSizeValue,
      hasDVI: this.hasDVIValue,
      hasHDMI: this.hasHDMIValue,
      hasVGA: this.hasVGAValue
    }
  }

  get screenSizeValue (): Primitives<MonitorScreenSize> {
    return this.screenSize.value
  }

  get hasDVIValue (): Primitives<HasDVI> {
    return this.hasDVI.value
  }

  get hasHDMIValue (): Primitives<HasHDMI> {
    return this.hasHDMI.value
  }

  get hasVGAValue (): Primitives<HasVGA> {
    return this.hasVGA.value
  }
}
