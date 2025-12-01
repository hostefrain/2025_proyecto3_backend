import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProyectoDocument = HydratedDocument<Proyecto>;

@Schema({ timestamps: true })
export class Proyecto {

  @Prop({ required: true })
  nombre: string;

  // Relaciones

  // Cliente 1 -> * Proyecto
  @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
  clienteId: Types.ObjectId;

  // TipoProyecto 1 -> * Proyecto
  @Prop({ type: Types.ObjectId, ref: 'TipoProyecto', required: true })
  tipoProyectoId: Types.ObjectId;
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
