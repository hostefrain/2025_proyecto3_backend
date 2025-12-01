import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TipoReclamoDocument = HydratedDocument<TipoReclamo>;

@Schema({ timestamps: true })
export class TipoReclamo {

  @Prop({ required: true })
  nombre: string;
}

export const TipoReclamoSchema = SchemaFactory.createForClass(TipoReclamo);
