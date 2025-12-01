import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AreaDocument = HydratedDocument<Area>;

@Schema({ collection: 'areas', timestamps: true })
export class Area {
  @Prop({ required: true })
  nombre: string;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
