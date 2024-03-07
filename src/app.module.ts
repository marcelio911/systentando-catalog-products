import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MongooseModule.forRoot(
      `mongodb+srv://${encodeURIComponent(
        process.env.USER_DB as string,
      )}:${encodeURIComponent(process.env.PASS_DB as string)}@${
        process.env.HOST_DB
      }/`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
