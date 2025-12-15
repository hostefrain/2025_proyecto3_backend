import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({ timestamps: true })
export class Usuario {

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  contrasena: string;

  // --- Relaciones ---

  // Rol 1 -> * Usuario
  @Prop({ type: Types.ObjectId, ref: 'Rol', required: true })
  rolId: Types.ObjectId;

  // Area 1 -> * Usuario
  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  areaId: Types.ObjectId;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
