
## Server-side POST Request Handler to Register a Smartphone

To allow the manager to register used smartphones, we provide a RESTful API endpoint that stores an inventory item in MongoDB.

---

###  Endpoint

```http
POST /inventory/register
```

---

### 📦 Example Request Payload

```json
{
  "manufacturerId": "67f56df5f77fdc4936f5bff3",
  "modelId": "67f56df5f77fdc4936f5bfff",
  "bodyColorId": "67f56df5f77fdc4936f5bff7",
  "dataMemoryId": "67f56df5f77fdc4936f5bffb",
  "osVersion": "iOS 15.0",
  "price": 999.99,
  "yearOfManufacture": 2021
}
```

---

## Request Handling Flow

### 1. **Controller**
Handles the incoming request and delegates to the service:

```ts
@Post('register')
async register(@Body() dto: CreateInventoryDto) {
  return this.inventoryService.create(dto);
}
```

---

### 2. **DTO Validation**

```ts
export class CreateInventoryDto {
  @IsMongoId()
  manufacturerId: string;

  @IsMongoId()
  modelId: string;

  @IsMongoId()
  bodyColorId: string;

  @IsMongoId()
  dataMemoryId: string;

  @IsString()
  osVersion: string;

  @IsNumber()
  price: number;

  @IsInt()
  yearOfManufacture: number;
}
```

If any field is missing or invalid, NestJS automatically returns a `400 Bad Request` response.

---

### 3. **Service Logic**

```ts
async create(dto: CreateInventoryDto): Promise<Inventory> {
  const {
    manufacturerId,
    modelId,
    bodyColorId,
    dataMemoryId,
    osVersion,
    price,
    yearOfManufacture,
  } = dto;

  // 1. Validate Manufacturer
  const manufacturer = await this.manufacturerModel.findById(manufacturerId);
  if (!manufacturer) {
    throw new NotFoundException('Manufacturer not found');
  }

  // 2. Validate Model and check if it belongs to Manufacturer
  const model = await this.modelModel.findById(modelId);
  if (!model) {
    throw new NotFoundException('Model not found');
  }

  if (model.manufacturerId.toString() !== manufacturerId) {
    throw new BadRequestException('Model does not belong to the given manufacturer');
  }

  // 3. Validate body color
  if (!model.bodyColors.some(id => id.toString() === bodyColorId)) {
    throw new BadRequestException('Body color is not available for this model');
  }

  const bodyColor = await this.bodyColorModel.findById(bodyColorId);
  if (!bodyColor) {
    throw new NotFoundException('Body color not found');
  }

  // 4. Validate data memory
  if (!model.dataMemories.some(id => id.toString() === dataMemoryId)) {
    throw new BadRequestException('Data memory is not available for this model');
  }

  const dataMemory = await this.dataMemoryModel.findById(dataMemoryId);
  if (!dataMemory) {
    throw new NotFoundException('Data memory not found');
  }

  // 5. Validate year of manufacture within model lifecycle
  const releaseYear = model.releaseDate?.getFullYear();
  const endSupportYear = model.endSupportDate?.getFullYear();

  if (releaseYear && yearOfManufacture < releaseYear) {
    throw new BadRequestException(
      `Year of manufacture (${yearOfManufacture}) is before release year (${releaseYear})`,
    );
  }

  if (endSupportYear && yearOfManufacture > endSupportYear) {
    throw new BadRequestException(
      `Year of manufacture (${yearOfManufacture}) is after end of support year (${endSupportYear})`,
    );
  }

  // 6. Save the inventory data
  const newInventory = new this.inventoryModel({
    modelId,
    modelName: model.name,
    manufacturerId,
    manufacturerName: manufacturer.name,
    bodyColorId,
    bodyColorName: bodyColor.color,
    dataMemoryId,
    dataMemorySize: dataMemory.size,
    osVersion,
    price,
    yearOfManufacture,
  });

  return await newInventory.save();
}
```

### 6. **Inventory Schema (Mongoose)**
```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Inventory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Manufacturer', required: true })
  manufacturerId: Types.ObjectId;

  @Prop()
  manufacturerName: string;

  @Prop({ type: Types.ObjectId, ref: 'Model', required: true })
  modelId: Types.ObjectId;

  @Prop()
  modelName: string;

  @Prop({ type: Types.ObjectId, ref: 'BodyColor', required: true })
  bodyColorId: Types.ObjectId;

  @Prop()
  bodyColorName: string;

  @Prop({ type: Types.ObjectId, ref: 'DataMemory', required: true })
  dataMemoryId: Types.ObjectId;

  @Prop()
  dataMemorySize: string;

  @Prop({ required: true })
  osVersion: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  yearOfManufacture: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

```

---

## 📜 Full Source Code
You can find the full implementation in this GitHub repo:

> 🔗 **https://github.com/trungnv184/smartphone-inventory**

It contains:
- MongoDB schemas
- Controller, DTO, and service logic
- Seed scripts with `mongodb-memory-server`
- README with usage instructions

---

