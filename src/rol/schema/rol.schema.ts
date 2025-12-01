import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;

@Schema({ timestamps: true })
export class Rol {

  @Prop({ required: true })
  nombre: string;
}

export const RolSchema = SchemaFactory.createForClass(Rol);
