import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductMongo, ProductMongoSchema } from '../data/schemas/ProductSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductsRepository } from '../repository/products-repository';

describe('ProductsService', () => {
  let service: ProductsService;
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
      providers: [ProductsService, ProductsRepository],
    }).overrideProvider(ProductsService)
      .useValue({}) // Provide an empty object as the value
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    if (mongod) {
      await mongod.stop();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
