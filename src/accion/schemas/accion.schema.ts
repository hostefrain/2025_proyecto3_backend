import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type AccionDocument = HydratedDocument<Accion>;

@Schema({ timestamps: true })
export class Accion {
  
  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: Date, required: true })
  fecha: Date;

  // Relaciones
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TipoAccion', required: true })
  tipoAccionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EstadoAccion', required: true })
  estadoAccionId: Types.ObjectId;
}

export const AccionSchema = SchemaFactory.createForClass(Accion);
