// src/products/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { ProductsDto } from '../data/dtos/products-dto';
import { ProductsRepository } from '../repository/products-repository';
import { ProductsMapper } from '../mapper/products-mapper/products-mapper';

@Injectable()
export class ProductsService {

    constructor(
        private repository: ProductsRepository,
    ) { }

    affiliateUrls: string[] = ['amazon.com', 'shopee.com', 'mercadolivre.com.br'];

    async getProducts(): Promise<ProductsDto[]> {
        return ProductsMapper.transformList(await this.repository.listarTodos());
    }

    createProduct(productData: any): ProductsDto {
        const isAffiliateUrl = this.isAffiliateUrl(new URL(productData.url).hostname);
        if (!isAffiliateUrl) {
            throw new Error('Affiliate URLs are not allowed');
        }
        // Verifica se todos os campos obrigatórios estão presentes
        if (!productData.name) {
            throw new Error('Name is required');
        }
        if (!productData.description) {
            throw new Error('Description is required');
        }
        if (!productData.price) {
            throw new Error('Price is required');
        }
        if (!productData.supplier) {
            throw new Error('Supplier is required');
        }

        // Cria e retorna o produto
        const product: ProductsDto = {
            _id: Math.random().toString(36).substring(7),
            name: productData.name,
            description: productData.description,
            price: productData.price,
            supplier: productData.supplier,
            url: productData.url,
            thumbnailUrl: productData.thumbnailUrl,
            imageUrl: productData.imageUrl,
            brand: productData.brand,
            createdAt: Date.now(),
        };
        this.repository.salvarOuAtualizarPorId(product);
        return product;
    }

    private isAffiliateUrl(url: string): boolean {
        return this.affiliateUrls.some(affiliateUrl => url.includes(affiliateUrl));
      }
}

