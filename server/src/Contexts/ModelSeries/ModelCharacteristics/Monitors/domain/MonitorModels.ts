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
    private screenSize: MonitorScreenSize,
    private hasDVI: HasDVI,
    private hasHDMI: HasHDMI,
    private hasVGA: HasVGA
  ) {
    super(id, name, categoryId, brandId)
  }

  static create (params: Omit<MonitorModelsPrimitives, 'id'>): MonitorModels {
    if (!this.isMonitorCategory({categoryId: params.categoryId})) {
      throw new Error('Invalid category')
    }
       
    const id = ModelSeriesId.random().value
    return new MonitorModels(
      new ModelSeriesId(id),
      new ModelSeriesName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new MonitorScreenSize(params.screenSize),
      new HasDVI(params.hasDVI),
      new HasHDMI(params.hasHDMI),
      new HasVGA(params.hasVGA)
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

  updateScreenSize (newValue: Primitives<MonitorScreenSize>): void {
    this.screenSize = new MonitorScreenSize(newValue)
  }
  updateHasDVI (newValue: Primitives<HasDVI>): void {
    this.hasDVI = new HasDVI(newValue)
  }
  updateHasHDMI (newValue: Primitives<HasHDMI>): void {
    this.hasHDMI = new HasHDMI(newValue)
  }
  updateHasVGA (newValue: Primitives<HasVGA>): void {
    this.hasVGA = new HasVGA(newValue)
  }
}
