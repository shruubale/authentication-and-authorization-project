import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { UsersSeederService } from './users/seeds/userSeed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSeederService = app.get(UsersSeederService);
  await dataSeederService.create()

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
