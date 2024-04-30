import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { ProductsDto } from '../data/dtos/products-dto';
import { ProductsRepository } from '../repository/products-repository';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, ProductsRepository],
    }).overrideProvider(ProductsService)
      .useValue({
        getProducts: () => 'Get all products',
        createProduct: () => 'Create a product',
        listaTodos: () => 'Get all products',
        salvarOuAtualizarPorId: () => 'Create a product',
      }) // Provide an empty object as the value
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a string', () => {
    const mock: ProductsDto = {
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      supplier: 'Supplier A',
      url: 'https://www.shopee.com/product1',
      _id: '',
      thumbnailUrl: undefined,
      createdAt: 0
    };
    expect(controller.createProduct(mock)).toBe('Create a product');
  });
});
