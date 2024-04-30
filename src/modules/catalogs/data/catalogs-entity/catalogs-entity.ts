import { ProductSchema } from "src/modules/products/data/products-entity";


export interface CatalogSchema {
    id: string;
    name: string;
    ownerId: string; // ID do usuário proprietário do catálogo
    products: ProductSchema[]; // Array de produtos no catálogo

    createdAt: number; // Data de criação do catálogo
    updatedAt?: number; // Data da última atualização do catálogo
    isDeleted?: boolean; // Indica se o catálogo foi excluído
}
