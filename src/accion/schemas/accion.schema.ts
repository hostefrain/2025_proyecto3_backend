import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';


export type AccionDocument = HydratedDocument<Accion>;

@Schema({ timestamps: true })
export class Accion extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Reclamo', required: true })
  reclamoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  areaOrigenId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  areaDestinoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  responsableId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Estado', required: true })
  estadoActualId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Estado', required: true })
  estadoNuevoId: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  descripcion: string;

  @Prop({ type: Date, default: Date.now })
  fechaHora: Date;
}

export const AccionSchema = SchemaFactory.createForClass(Accion);
