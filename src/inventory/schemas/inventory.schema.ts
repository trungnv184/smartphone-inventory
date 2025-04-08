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
