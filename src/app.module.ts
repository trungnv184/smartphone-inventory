import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory/inventory.module';
import { getMongoConfig } from './config/db.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    MongooseModule.forRootAsync({
      useFactory: async () => await getMongoConfig(),
    }),
    InventoryModule,
  ],
  controllers: [],
})
export class AppModule {}
