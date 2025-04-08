import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'src/app.module';
import { executeMemorySeed } from './seed-memory.logic';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const useMemory = config.get('USE_MEMORY_DB') === 'true';

  console.log('USE_MEMORY', useMemory);
  if (useMemory) {
    console.log('🌱 Seeding memory DB...');
    await executeMemorySeed(app); // Seed directly with app's Mongoose connection
  }

  await app.listen(3000);
}
bootstrap();
