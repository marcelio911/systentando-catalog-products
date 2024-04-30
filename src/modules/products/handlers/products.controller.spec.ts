import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { ProductsDto } from '../data/dtos/products-dto';
import { ProductsRepository } from '../repository/products-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMongo, ProductMongoSchema } from '../data/schemas/ProductSchema';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: ProductMongo.name, schema: ProductMongoSchema },
        ]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService, ProductsRepository],
    })
      .overrideProvider(ProductsService)
      .useValue({
        getProducts: () => 'Get all products',
        createProduct: () => 'Create a product',
        listaTodos: () => 'Get all products',
        salvarOuAtualizarPorId: () => 'Create a product',
      }) // Provide an empty object as the value
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  afterAll(async () => {
    if (mongod) {
      await mongod.stop();
    }
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
      createdAt: 0,
    };
    expect(controller.createProduct(mock)).toBeDefined();
  });
});
