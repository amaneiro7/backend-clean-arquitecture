import { FindOptions } from "sequelize";
import { Criteria } from "../../../../../Shared/domain/criteria/Criteria";


export class UsersAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = ['role']
        return options
    }
}