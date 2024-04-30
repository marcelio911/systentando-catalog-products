import { ProductsDto } from "../../data/dtos/products-dto";
import { ProductSchema } from "../../data/products-entity";

export class ProductsMapper {
    static transform(data: ProductSchema): ProductsDto {
        const response = {
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            supplier: data.supplier,
            url: data.url,
            thumbnailUrl: data.thumbnailUrl,
            imageUrl: data.imageUrl,
            brand: data.brand,
            model: data.model,
            color: data.color,
            weight: data.weight,
            height: data.height,
            width: data.width,
            length: data.length,
            quantity: data.quantity,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            isDeleted: data.isDeleted,
        };
        return response;
    }
    static transformList(entities: ProductSchema[]): ProductsDto[] {
        const response = entities.map((entity) => {
            return this.transform(entity);
        });
        return response;
    }
    static schema(entity: ProductsDto): ProductSchema {
        const response = {
            _id: entity._id,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            supplier: entity.supplier,
            url: entity.url,
            thumbnailUrl: entity.thumbnailUrl,
            imageUrl: entity.imageUrl,
            brand: entity.brand,
            model: entity.model,
            color: entity.color,
            weight: entity.weight,
            height: entity.height,
            width: entity.width,
            length: entity.length,
            quantity: entity.quantity,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            isDeleted: entity.isDeleted,
        };
        return response;
    }
}
