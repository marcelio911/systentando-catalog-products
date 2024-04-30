import { ProductsDto } from "../../../../../modules/products/data/dtos/products-dto";

export class CatalogsDto {
    id: string;
    name: string;
    ownerId: string;
    products: ProductsDto[];

    createdAt: number; // Data de criação do catálogo
    updatedAt?: number; // Data da última atualização do catálogo
    isDeleted?: boolean; // Indica se o catálogo foi excluído

}
