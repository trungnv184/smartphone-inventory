import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BodyColor extends Document {
  @Prop({ required: true })
  color: string; // eg: 'Black', 'White', 'Red', etc.
}

export const BodyColorSchema = SchemaFactory.createForClass(BodyColor);
