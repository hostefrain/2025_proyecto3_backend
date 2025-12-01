import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NivelCriticidadDocument = HydratedDocument<NivelCriticidad>;

@Schema({ collection: 'niveles_criticidad', timestamps: true })
export class NivelCriticidad {
  @Prop({ required: true })
  nombre: string;
}

export const NivelCriticidadSchema = SchemaFactory.createForClass(NivelCriticidad);
