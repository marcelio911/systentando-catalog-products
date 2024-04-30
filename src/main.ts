import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { clc } from '@nestjs/common/utils/cli-colors.util';

import { AppModule } from './app.module';


async function bootstrap() {
  const logger = new ConsoleLogger();

  const app = await NestFactory.create(AppModule);
  const packageFile = resolve(__dirname, '../package.json');
  const pkg = JSON.parse(readFileSync(packageFile).toString());
  const config = new DocumentBuilder()
    .setTitle(`${pkg.name} example`)
    .setDescription(pkg.description)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  const port = process.env.PORT || 3000;
  logger.log(
    `${clc.magentaBright('🚀')} ${clc.green(
      'Application ready on port',
    )} ${clc.yellow(port.toString())}${clc.green('')}`,
  );

  await app.listen(port);
}
bootstrap();
