// src/products/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { PriceDto, ProductsDto } from '../data/dtos/products-dto';
import { ProductsRepository } from '../repository/products-repository';
import { ProductsMapper } from '../mapper/products-mapper/products-mapper';
import { ScrappingService } from './scrapping-service';
import { ICMSStrategy, ICMSCStStrategy, TaxStrategy } from 'src/modules/taxes/tax-calculator/tax-strategy';

@Injectable()
export class ProductsService {
  constructor(
    private repository: ProductsRepository,
    private scrappingService: ScrappingService,
    private icmsStrategy: ICMSStrategy,
    private icmsCSTStrategy: ICMSCStStrategy,
    // ... outras estratégias ...
  ) { }

  // ... seus métodos ...

  calcularPrecoComImposto(product: ProductsDto, estado: string): number {
    let taxStrategy: TaxStrategy;

    // ... lógica para determinar a estratégia de imposto correta ...
    // Exemplo:
    if (product.informacoesFiscais.cest) {
      taxStrategy = this.icmsCSTStrategy; // Use a estratégia de ICMS-ST
    } else {
      taxStrategy = this.icmsStrategy; // Use a estratégia de ICMS padrão
    }

    const precoBase = product.price.amount();
    const imposto = taxStrategy.calculateTax(product, estado);
    return precoBase + imposto;
  }

  affiliateUrls: string[] = ['amazon.com', 'shopee.com', 'mercadolivre.com.br'];

  async getProducts(): Promise<ProductsDto[]> {
    return ProductsMapper.transformList(await this.repository.listarTodos());
  }

  importingProducts(url: string): ProductsDto {
    // TODO call Implemeting scraping service
    this.scrappingService.request(url);
    return null;
  }


  createProduct(productData: ProductsDto): ProductsDto {
    const isAffiliateUrl = this.isAffiliateUrl(
      new URL(productData.url).hostname,
    );
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
    if (!productData.supplierID) {
      throw new Error('Supplier is required');
    }

    // Cria e retorna o produto
    const product: ProductsDto = {
      _id: Math.random().toString(36).substring(7),
      name: productData.name,
      description: productData.description,
      price: productData.price,
      supplierID: productData.supplierID,
      url: productData.url,
      thumbnailUrl: productData.thumbnailUrl,
      imageUrl: productData.imageUrl,
      brand: productData.brand,
      affiliateUrl: productData.affiliateUrl,
      affiliateID: productData.affiliateID,
      createdAt: Date.now(),
      dimensions: productData.dimensions,
      quantityInStock: productData.quantityInStock,
      informacoesFiscais: productData.informacoesFiscais,
      ean13: productData.ean13,
      ncm: productData.ncm,
      unidadeMedida: productData.unidadeMedida,
      isDeleted: false,
      color: productData.color,
      model: productData.model,
      recommendedAge: productData.recommendedAge,
      updatedAt: Date.now(),
      setPrice: function (priceDto: PriceDto): void {
        throw new Error('Function not implemented.');
      },
      setName: function (text: string): void {
        throw new Error('Function not implemented.');
      },
      setDescription: function (text: string): void {
        throw new Error('Function not implemented.');
      },
      setSupplierID: function (ID: string): void {
        throw new Error('Function not implemented.');
      },
      setUrl: function (text: string): void {
        throw new Error('Function not implemented.');
      },
      setRecommendedAge: function (ages: string): void {
        throw new Error('Function not implemented.');
      },
      setAffiliateUrl: function (url: string): void {
        throw new Error('Function not implemented.');
      },
      setAffiliateID: function (ID: string): void {
        throw new Error('Function not implemented.');
      },
      setThumbnailUrl: function (url: URL): void {
        throw new Error('Function not implemented.');
      },
      setImageUrls: function (array: string[]): void {
        throw new Error('Function not implemented.');
      },
      setBrand: function (text: string): void {
        throw new Error('Function not implemented.');
      },
      setModel: function (text: string): void {
        throw new Error('Function not implemented.');
      },
      setColor: function (type: string): void {
        throw new Error('Function not implemented.');
      },
      setDimentions: function (obj: { weight: number; height: number; width: number; length: number; }): void {
        throw new Error('Function not implemented.');
      },
      setQuantityInStock: function (amount: number): void {
        throw new Error('Function not implemented.');
      }
    };
    this.repository.salvarOuAtualizarPorId(product);
    return product;
  }

  private isAffiliateUrl(url: string): boolean {
    return this.affiliateUrls.some((affiliateUrl) =>
      url.includes(affiliateUrl),
    );
  }
}
