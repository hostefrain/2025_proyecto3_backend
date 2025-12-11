import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReclamoDocument = HydratedDocument<Reclamo>;

@Schema({ timestamps: true })
export class Reclamo {

  @Prop({ required: true })
  descripcion: string;

  // --- Relaciones ---

  // Proyecto 1 -> * Reclamo
  @Prop({ type: Types.ObjectId, ref: 'Proyecto', required: true })
  proyectoId: Types.ObjectId;

  // TipoReclamo 1 -> * Reclamo
  @Prop({ type: Types.ObjectId, ref: 'TipoReclamo', required: true })
  tipoReclamoId: Types.ObjectId;

  // Prioridad 1 -> * Reclamo
  @Prop({ type: Types.ObjectId, ref: 'Prioridad', required: true })
  prioridadId: Types.ObjectId;

  // NivelCriticidad 1 -> * Reclamo
  @Prop({ type: Types.ObjectId, ref: 'NivelCriticidad', required: true })
  nivelCriticidadId: Types.ObjectId;

  // Estado 1 -> * Reclamo
  @Prop({ type: Types.ObjectId, ref: 'Estado', required: true })
  estadoId: Types.ObjectId;

}

export const ReclamoSchema = SchemaFactory.createForClass(Reclamo);
