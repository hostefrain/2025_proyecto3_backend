import { Types } from 'mongoose';

export type AccionCreate = {
  reclamoId: Types.ObjectId;
  areaOrigenId: Types.ObjectId;
  areaDestinoId: Types.ObjectId;
  responsableId: Types.ObjectId;
  estadoActualId: Types.ObjectId;
  estadoNuevoId: Types.ObjectId;
  descripcion: string;
  fechaHora: Date;
};