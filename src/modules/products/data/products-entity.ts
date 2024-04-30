export interface ProductSchema {

    _id: string;
    url: string;
    name?: string;
    description?: string;
    price?: number;
    supplier?: string;

    thumbnailUrl?: URL; // URL da thumbnail do produto
    imageUrl?: string[]; // URL da imagem do produto

    brand?: string;
    model?: string;
    color?: string;
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    quantity?: number;

    createdAt: number;
    updatedAt?: number;
    isDeleted?: boolean;
}
