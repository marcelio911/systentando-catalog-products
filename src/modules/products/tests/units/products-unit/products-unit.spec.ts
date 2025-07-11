import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../data/products-entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../../../repository/products-repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMongo, ProductMongoSchema } from '../../../data/schemas/ProductSchema';

describe('ProductsUnit', () => {
  let productService: ProductsService;
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
    })
      // .overrideProvider(ProductsService)
      // .useValue({
      //   createProduct: (productData: ProductSchema) => productData,
      // })
      .compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    if (mongod) {
      await mongod.stop();
    }
  });

  it('should create a product', () => {
    const productData = {
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      supplier: 'Supplier A',
      url: 'https://www.shopee.com/product1',
    };

    const createdProduct = productService.createProduct(productData);

    expect(createdProduct).toBeDefined();
    expect(createdProduct.name).toEqual('Product 1');
    expect(createdProduct.description).toEqual('Description of Product 1');
    expect(createdProduct.price).toEqual(19.99);
    expect(createdProduct.supplier).toEqual('Supplier A');
  });

  it('should throw an error if name is missing', () => {
    const productData = {
      description: 'Description of Product 1',
      price: 19.99,
      supplier: 'Supplier A',
      url: 'https://www.shopee.com/product1',
    };

    expect(() => productService.createProduct(productData)).toThrowError(
      'Name is required',
    );
  });

  it('should throw an error if url is not valid', () => {
    const productData: Product = {
      name: 'Product 1',
      description: '',
      price: 19.99,
      supplier: 'Supplier A',
      url: 'https://www.example.com/product1',
      _id: '',
      createdAt: 0,
    };

    expect(() => productService.createProduct(productData)).toThrowError(
      'Affiliate URLs are not allowed',
    );
  });

  // Adicione mais testes para outros campos obrigatórios e cenários de erro
});
