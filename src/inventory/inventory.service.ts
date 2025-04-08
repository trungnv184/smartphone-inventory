import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel } from 'mongoose';
import { Inventory } from './schemas/inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Model as PhoneModel } from './schemas/model.schema';
import { Manufacturer } from './schemas/manufacturer.schema';
import { BodyColor } from './schemas/body-color.schema';
import { DataMemory } from './schemas/data-memory.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: MongooseModel<Inventory>,

    @InjectModel(PhoneModel.name)
    private readonly modelModel: MongooseModel<PhoneModel>,

    @InjectModel(Manufacturer.name)
    private readonly manufacturerModel: MongooseModel<Manufacturer>,

    @InjectModel(BodyColor.name)
    private readonly bodyColorModel: MongooseModel<BodyColor>,

    @InjectModel(DataMemory.name)
    private readonly dataMemoryModel: MongooseModel<DataMemory>,
  ) {}

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
}
