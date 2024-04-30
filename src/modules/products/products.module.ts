import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './handlers/products.controller';
import { ProductsRepository } from './repository/products-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMongo, ProductMongoSchema } from './data/schemas/ProductSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductMongo.name, schema: ProductMongoSchema },
    ]),
    ProductMongo,
  ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
