import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { TaxesModule } from './modules/taxes/taxes.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${encodeURIComponent(
        process.env.USER_DB as string,
      )}:${encodeURIComponent(process.env.PASS_DB as string)}@${
        process.env.HOST_DB
      }/`,
    ),
    ProductsModule,
    SuppliersModule,
    CatalogsModule,
    TaxesModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
