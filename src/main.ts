import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const httpPort = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://example1.com'],
  optionsSuccessStatus: 204,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(httpPort);
}
bootstrap();
