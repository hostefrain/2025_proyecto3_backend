import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PrioridadDocument = HydratedDocument<Prioridad>;

@Schema({ collection: 'prioridades', timestamps: true })
export class Prioridad {
  @Prop({ required: true })
  nombre: string;
}

export const PrioridadSchema = SchemaFactory.createForClass(Prioridad);
