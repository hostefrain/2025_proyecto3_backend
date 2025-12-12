import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type ReclamoDocument = HydratedDocument<Reclamo>;

@Schema({ timestamps: true })
export class Reclamo {

  @IsString()
  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: [String], default: [] })
  imagenes: string[];

  @Prop({ type: [String], default: [] })
  archivos: string[];

  @IsMongoId()
  @Prop({ type: Types.ObjectId, ref: 'Proyecto', required: true })
  proyectoId: Types.ObjectId;

  @IsMongoId()
  @Prop({ type: Types.ObjectId, ref: 'TipoReclamo', required: true })
  tipoReclamoId: Types.ObjectId;

  @IsMongoId()
  @Prop({ type: Types.ObjectId, ref: 'Prioridad', required: true })
  prioridadId: Types.ObjectId;

  @IsMongoId()
  @Prop({ type: Types.ObjectId, ref: 'NivelCriticidad', required: true })
  nivelCriticidadId: Types.ObjectId;

  @IsMongoId()
  @Prop({ type: Types.ObjectId, ref: 'Estado', required: true })
  estadoId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Accion' }] })
  acciones: Types.ObjectId[];
}

export const ReclamoSchema = SchemaFactory.createForClass(Reclamo);
