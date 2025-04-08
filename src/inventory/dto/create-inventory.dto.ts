import { IsMongoId, IsString, IsNumber, IsInt } from 'class-validator';

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
