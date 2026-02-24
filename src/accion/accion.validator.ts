import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ReclamoService } from '../reclamo/reclamo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AreaService } from '../area/area.service';
import { EstadoService } from '../estado/estado.service';
import { Inject } from '@nestjs/common';
import type { IAccionRepository } from './IAccionRepository';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { Reclamo } from '../reclamo/schemas/reclamo.schema';
import { Usuario } from '../usuario/schema/usuario.schema';
import { Area } from '../area/schemas/area.schema';
import { Estado } from '../estado/schemas/estado.schema';

@Injectable()
export class AccionValidator {
  private readonly logger = new Logger(AccionValidator.name);
  private readonly ENTITY_NAME = 'Accion';

  constructor(
    private readonly reclamoService: ReclamoService,
    private readonly usuarioService: UsuarioService,
    private readonly areaService: AreaService,
    private readonly estadoService: EstadoService,
    @Inject('IAccionRepository')
    private readonly accionRepository: IAccionRepository,
  ) {}

  // CREATE

  async validarCreate(createAccionDto: CreateAccionDto) {
    const { reclamoId, areaDestinoId, responsableId, estadoNuevoId } =
      createAccionDto;

    const reclamo = await this.reclamoService.findOneRaw(reclamoId);

    if (!reclamo) {
      throw new NotFoundException(
        `No existe un Reclamo con id: ${reclamoId}`,
      );
    }

    const estadoActualId = reclamo.estadoId.toString();
    const areaOrigenId = reclamo.areaId.toString();

    await this.verificarExistenciaArea(areaOrigenId);
    await this.verificarExistenciaEstado(estadoActualId);

    await this.verificarExistenciaArea(areaDestinoId);
    await this.verificarExistenciaUsuario(responsableId);
    await this.verificarExistenciaEstado(estadoNuevoId);

    return {
      reclamo,
      estadoActualId,
      areaOrigenId,
    };
  }

  // UPDATE

  async validarUpdate(id: string, updateDto: UpdateAccionDto) {
    await this.verificarExistenciaAccion(id);

    if (updateDto.reclamoId) {
      const reclamo = await this.verificarExistenciaReclamo(updateDto.reclamoId);

      const estadoActualId = reclamo.estadoId.toString();
      const areaOrigenId = reclamo.areaId.toString();

      await this.verificarExistenciaArea(areaOrigenId);
      await this.verificarExistenciaEstado(estadoActualId);
    }

    if (updateDto.areaDestinoId) {
      await this.verificarExistenciaArea(updateDto.areaDestinoId);
    }

    if (updateDto.estadoNuevoId) {
      await this.verificarExistenciaEstado(updateDto.estadoNuevoId);
    }

    if (updateDto.responsableId) {
      await this.verificarExistenciaUsuario(updateDto.responsableId);
    }
  }

  async validarRemove(id: string) {
    await this.verificarExistenciaAccion(id);
  }

  async validarFindByReclamo(reclamoId: string) {
    await this.verificarExistenciaReclamo(reclamoId);
  }

  private async verificarExistenciaReclamo(
    reclamoId: string,
  ): Promise<Reclamo> {
    const reclamo = await this.reclamoService.findOne(reclamoId);

    if (!reclamo) {
      this.logger.error(`Reclamo con id: ${reclamoId} no existe`);
      throw new NotFoundException(
        `No existe un Reclamo con id: ${reclamoId}`,
      );
    }

    return reclamo;
  }

  private async verificarExistenciaUsuario(
    usuarioId: string,
  ): Promise<Usuario> {
    const usuario = await this.usuarioService.findOne(usuarioId);

    if (!usuario) {
      this.logger.error(`Usuario con id: ${usuarioId} no existe`);
      throw new NotFoundException(
        `No existe un Usuario con id: ${usuarioId}`,
      );
    }

    return usuario;
  }

  private async verificarExistenciaArea(areaId: string): Promise<Area> {
    const area = await this.areaService.findOne(areaId);

    if (!area) {
      this.logger.error(`Area con id: ${areaId} no existe`);
      throw new NotFoundException(`No existe un Area con id: ${areaId}`);
    }

    return area;
  }

  private async verificarExistenciaEstado(
    estadoId: string,
  ): Promise<Estado> {
    const estado = await this.estadoService.findById(estadoId);

    if (!estado) {
      this.logger.error(`Estado con id: ${estadoId} no existe`);
      throw new NotFoundException(
        `No existe un Estado con id: ${estadoId}`,
      );
    }

    return estado;
  }

  private async verificarExistenciaAccion(idAccion: string) {
    const accion = await this.accionRepository.findOne(idAccion);

    if (!accion) {
      this.logger.error(
        `El id ${idAccion} no existe en ${this.ENTITY_NAME}`,
      );
      throw new NotFoundException(`El id ${idAccion} no existe.`);
    }

    return accion;
  }
}