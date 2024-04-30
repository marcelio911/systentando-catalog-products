import { CatalogSchema } from './catalogs-entity';

describe('CatalogSchema', () => {
  it('should be defined', () => {
    const catalog: CatalogSchema = {
      id: '1',
      name: 'catalog',
      ownerId: '1',
      products: [],
      createdAt: Date.now(),
    }
    expect(catalog).toBeDefined();
  });
});
