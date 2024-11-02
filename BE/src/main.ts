import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { HttpExceptionFilter } from './exception/exception.filter';
import { setupSwagger } from './swagger/swagger.setting';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.setBaseViewsDir(__dirname + '/../views');
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: `/static`,
  });

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
