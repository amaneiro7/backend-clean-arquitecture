import { BrandPrimitives } from "../../../Brand/domain/Brand";
import { BrandId } from "../../../Brand/domain/BrandId";
import { BrandRepository } from "../../../Brand/domain/BrandRepository";
import { Primitives } from "../../../Shared/domain/value-object/Primitives";
import { ModelSeries } from "./ModelSeries";

export class ModelSeriesBrand extends BrandId {
    static async updateBrandField(params: { repository: BrandRepository, brandId: Primitives<BrandId>, entity: ModelSeries }): Promise<void> {
        // Si no se ha pasado un nuevo valor de categoria no realiza ninguna acción
        if (params.brandId === undefined) {
            return
        }
        // Verifica que si la categoria actual y el nuevo valor de categoria son iguales no realice una busqueda en el repositorio
        if (params.entity.brandIdValue === params.brandId) {
            return
        }
        // Verifica que la categoria no exista en la base de datos, si existe lanza un error {@link BrandAlreadyExistError} con el valor de categoria
        await ModelSeriesBrand.ensureBrandExist({ repository: params.repository, brandId: params.brandId })
        // Actualiza el campo Brand de la entidad {@link ModelSeries} con el nuevo valor de categoria
        params.entity.updateBrandId(params.brandId)
    }
    static async ensureBrandExist(params: { repository: BrandRepository, brandId: Primitives<BrandId> }): Promise<void> {        
        const isBrandExist: BrandPrimitives | null = await params.repository.searchById(params.brandId)
        if (isBrandExist === null) {
            throw new Error('Brand does not exist')
        }
    }
}