export class ProductsDto {
  _id: string;
  name: string;
  description: string;
  price: number;
  supplier: string;
  url: string;

  thumbnailUrl: URL; // URL da thumbnail do produto
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
