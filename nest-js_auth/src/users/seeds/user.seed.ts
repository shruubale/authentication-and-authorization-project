// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UserRole } from '../users.model';
import { UsersService } from '../users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);



  await app.close();
}
bootstrap();
