import { Controller, Post, Body } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('register')
  async registerInventory(@Body() createInventoryDto: CreateInventoryDto) {
    console.log('Registering inventory:', createInventoryDto);
    return this.inventoryService.create(createInventoryDto);
  }
}
