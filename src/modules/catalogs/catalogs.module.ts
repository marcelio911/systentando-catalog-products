import { Module } from '@nestjs/common';
import { CatalogsService } from './services/catalogs.service';
import { CatalogsController } from './handlers/catalogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogMongo, CatalogSchemaMongo } from './data/schemas/CatalogSchema';
import { CatalogsRepository } from './repository/catalogs-repository/catalogs-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CatalogMongo.name, schema: CatalogSchemaMongo },
    ]),
  ],
  providers: [CatalogsService, CatalogsRepository],
  controllers: [CatalogsController],
})
export class CatalogsModule {}
