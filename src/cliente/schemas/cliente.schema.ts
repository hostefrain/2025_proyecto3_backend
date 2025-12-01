import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type ClienteDocument = HydratedDocument<Cliente>;

@Schema({ collection: 'clientes', timestamps: true })
export class Cliente {
  @Prop({ required: true })
  nombre: string;

  // Relación: Cliente 1..* Proyecto
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Proyecto' }] })
  proyectos: Types.ObjectId[];
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
