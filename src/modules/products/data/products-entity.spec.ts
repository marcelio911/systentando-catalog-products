import { ProductSchema } from './products-entity';

describe('ProductsEntity', () => {
  it('should be defined', () => {
    const product: ProductSchema = {
      _id: '1',
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      supplier: 'Supplier A',
      url: 'https://www.example.com/product1',
      createdAt: 0
    };
    expect(product).toBeDefined();
  });
});
