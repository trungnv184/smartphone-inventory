import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DataMemory extends Document {
  @Prop({ required: true })
  size: string; // e.g., "64GB", "128GB", "256GB"
}

export const DataMemorySchema = SchemaFactory.createForClass(DataMemory);
