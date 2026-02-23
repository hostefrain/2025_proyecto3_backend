import { Types } from 'mongoose';
import { CreateAccionDto } from '../dto/create-accion.dto';
import { AccionCreate } from '../types/accion.types';

export class AccionMapper {

  static toPersistence(
    dto: CreateAccionDto,
    estadoActualId: string,
    areaOrigenId: string,
  ): AccionCreate {

    return {
      reclamoId: new Types.ObjectId(dto.reclamoId),
      areaOrigenId: new Types.ObjectId(areaOrigenId),
      areaDestinoId: new Types.ObjectId(dto.areaDestinoId),
      responsableId: new Types.ObjectId(dto.responsableId),
      estadoActualId: new Types.ObjectId(estadoActualId),
      estadoNuevoId: new Types.ObjectId(dto.estadoNuevoId),
      descripcion: dto.descripcion,
      fechaHora: new Date(),
    };
  }
}