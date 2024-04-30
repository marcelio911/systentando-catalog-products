import { Test, TestingModule } from '@nestjs/testing';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from '../services/catalogs.service';
import { CatalogsRepository } from '../repository/catalogs-repository/catalogs-repository';

describe('CatalogsController', () => {
  let controller: CatalogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogsController],
      providers: [CatalogsService, CatalogsRepository],
    })
      .overrideProvider(CatalogsRepository)
      .useValue({}) // Provide an empty object as the value
      .compile();

    controller = module.get<CatalogsController>(CatalogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a string', () => {
    // expect(controller.getCatalogs()).toBe('This action returns all catalogs');
  });
});
