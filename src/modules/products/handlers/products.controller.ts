import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductsDto } from '../data/dtos/products-dto';

@Controller('products')
export class ProductsController {

    constructor(
        private readonly productsService: ProductsService,
    ) { }

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
}
