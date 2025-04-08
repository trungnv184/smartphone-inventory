import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Model extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  releaseDate: Date;

  @Prop()
  endSupportDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Manufacturer', required: true })
  manufacturerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'BodyColor' }], required: true })
  bodyColors: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DataMemory' }] })
  dataMemories: Types.ObjectId[];
}

export const ModelSchema = SchemaFactory.createForClass(Model);
