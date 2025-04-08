import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory, InventorySchema } from './schemas/inventory.schema';
import { InventoryModels } from './schemas';

@Module({
  imports: [MongooseModule.forFeature(InventoryModels)],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
