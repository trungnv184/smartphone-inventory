import { BodyColor, BodyColorSchema } from './body-color.schema';
import { DataMemory, DataMemorySchema } from './data-memory.schema';
import { Inventory, InventorySchema } from './inventory.schema';
import { Manufacturer, ManufacturerSchema } from './manufacturer.schema';
import { Model, ModelSchema } from './model.schema';

export const InventoryModels = [
  { name: Manufacturer.name, schema: ManufacturerSchema },
  { name: Inventory.name, schema: InventorySchema },
  { name: Model.name, schema: ModelSchema },
  { name: BodyColor.name, schema: BodyColorSchema },
  { name: DataMemory.name, schema: DataMemorySchema },
];
