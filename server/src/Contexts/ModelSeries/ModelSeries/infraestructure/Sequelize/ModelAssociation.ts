import { FindOptions } from "sequelize"
import { Criteria } from "../../../../Shared/domain/criteria/Criteria"

export class ModelAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = [
            'category',
            'brand',
            'modelPrinter',
            'modelMonitor',
            { association: 'modelLaptop', include: ['memoryRamType'] },
            { association: 'modelComputer', include: ['memoryRamType'] },
            { association: 'modelKeyboard', include: ['inputType'] }
          ]   
        return options
    }
}