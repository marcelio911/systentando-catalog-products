import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductsDto } from '../data/dtos/products-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts(): Promise<ProductsDto[]> {
    try {
      return await this.productsService.getProducts();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('')
  async createProduct(@Body() product: ProductsDto): Promise<ProductsDto> {
    return this.productsService.createProduct(product);
  }

  @Get('importing/:query')
  async importingProducts(@Param('query') query: string): Promise<ProductsDto> {
    // TODO: request url to scraping product info
    return this.productsService.importingProducts(query);
  }
}
