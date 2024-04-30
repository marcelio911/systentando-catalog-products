import { CatalogSchema } from '../../data/catalogs-entity/catalogs-entity';

describe('CatalogsRepository', () => {
  it('should be defined', () => {
    const catalog: CatalogSchema = {
      id: '1',
      name: 'Catalog 1',
      ownerId: '1',
      products: [],
      createdAt: 0,
    };
    expect(catalog).toBeDefined();
  });
});
