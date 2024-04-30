import { CatalogSchema as CatalogSchema } from "../../data/catalogs-entity/catalogs-entity";
import { CatalogsDto } from "../../data/dtos/catalogs-dto/catalogs-dto";
import { ProductsMapper } from '../../../products/mapper/products-mapper/products-mapper';

export class CatalogsMapper {

    static transform(data: CatalogSchema): CatalogsDto {
        const response: CatalogsDto = {
            id: data.id,
            name: data.name,
            ownerId: data.ownerId,
            products: ProductsMapper.transformList(data.products),

            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };

        return response;
    }

    static transformList(entities: CatalogSchema[]): CatalogsDto[] {
        const response: CatalogsDto[] = entities.map((entity: CatalogSchema) => {
            return this.transform(entity);
        });
        return response;
    }

    static schema(entity: CatalogsDto): CatalogSchema {
        const response: CatalogSchema = {
            id: entity.id,
            name: entity.name,
            ownerId: entity.ownerId,
            products: entity.products,

            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };

        return response;
    }

}
