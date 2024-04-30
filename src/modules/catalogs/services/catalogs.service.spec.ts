import { Test, TestingModule } from '@nestjs/testing';
import { CatalogsService } from './catalogs.service';
import { CatalogsRepository } from '../repository/catalogs-repository/catalogs-repository';

describe('CatalogsService', () => {
  let service: CatalogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogsService, CatalogsRepository],
    })
      .overrideProvider(CatalogsRepository)
      .useValue({}) // Provide an empty object as the value
      .compile();

    service = module.get<CatalogsService>(CatalogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
