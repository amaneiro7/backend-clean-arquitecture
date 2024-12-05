import { type CategoryPrimitives } from "../../../Category/SubCategory/domain/Category";
import { type Primitives } from "../../../Shared/domain/value-object/Primitives";
import { type ModelSeries } from "./ModelSeries";
import { type CategoryRepository } from "../../../Category/SubCategory/domain/CategoryRepository";
import { CategoryId } from "../../../Category/SubCategory/domain/CategoryId";
import { InvalidArgumentError } from "../../../Shared/domain/value-object/InvalidArgumentError";
import { ComputerModels } from "../../ModelCharacteristics/Computers/Computer/domain/ComputerModels";

export class ModelSeriesCategory extends CategoryId {
    static async updateCategoryField(params: { repository: CategoryRepository, categoryId: Primitives<CategoryId>, entity: ModelSeries }): Promise<void> {
        // Si no se ha pasado un nuevo valor de categoria no realiza ninguna acción
        if (params.categoryId === undefined) {
            return
        }
        // Verifica que si la categoria actual y el nuevo valor de categoria son iguales no realice una busqueda en el repositorio
        if (params.entity.categoryIdValue === params.categoryId) {
            return
        }
        // Verifica que la categoria no exista en la base de datos, si existe lanza un error {@link CategoryAlreadyExistError} con el valor de categoria
        await ModelSeriesCategory.ensureCategoryExist({ repository: params.repository, categoryId: params.categoryId })
        if (!ComputerModels.isComputerCategory({ categoryId: params.categoryId })) {
            throw new InvalidArgumentError('The category can only be changed if it belongs to Computer, Servers, or All-in-One.');
        }
        // Actualiza el campo category de la entidad {@link ModelSeries} con el nuevo valor de categoria
        params.entity.updateCategoryId(params.categoryId)
    }
    static async ensureCategoryExist(params: { repository: CategoryRepository, categoryId: Primitives<CategoryId> }): Promise<void> {
        const isCategoryExist: CategoryPrimitives | null = await params.repository.searchById(params.categoryId)
        if (isCategoryExist === null) {
            throw new Error('Category does not exist')
        }
    }
}