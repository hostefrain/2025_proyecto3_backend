import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import type { IAccionRepository } from './IAccionRepository';
import { ReclamoService } from 'src/reclamo/reclamo.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Reclamo } from 'src/reclamo/schemas/reclamo.schema';
import { AreaService } from 'src/area/area.service';
import { EstadoService } from 'src/estado/estado.service';
import { Usuario } from 'src/usuario/schema/usuario.schema';
import { Area } from 'src/area/schemas/area.schema';
import { Estado } from 'src/estado/schemas/estado.schema';

@Injectable()
export class AccionService {
  private readonly logger = new Logger(AccionService.name);
  private readonly ENTITY_NAME = 'Accion';

  constructor(
    private readonly reclamoService: ReclamoService,
    private readonly usuarioService: UsuarioService,
    private readonly areaService: AreaService,
    private readonly estadoService: EstadoService,
    @Inject('IAccionRepository') 
    private readonly accionRepository: IAccionRepository,
  ) {}

  async create(createAccionDto: CreateAccionDto) {
    this.logger.log(`Creando una nueva ${this.ENTITY_NAME}`);
    const {reclamoId, areaDestinoId, responsableId, estadoNuevoId} = createAccionDto;

    const reclamoEntity = await this.verificarExistenciaReclamo(reclamoId);
    
    const estadoActualId = reclamoEntity.estadoId.toString();
    const areaOrigenId = reclamoEntity.areaId.toString();

    await this.verificarExistenciaArea(areaOrigenId);
    await this.verificarExistenciaEstado(estadoActualId);

    await this.verificarExistenciaArea(areaDestinoId);
    await this.verificarExistenciaUsuario(responsableId);
    await this.verificarExistenciaEstado(estadoNuevoId);
  
    return this.accionRepository.create(
      createAccionDto,
      estadoActualId,
      areaOrigenId,  
    );
  }

  async findAll() {
    this.logger.log(`Buscando todos los ${this.ENTITY_NAME}s`);
    return this.accionRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`);
    return this.accionRepository.findOne(id);
  }

async update(id: string, updateAccionDto: UpdateAccionDto) {
  this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`);

  const accion = await this.accionRepository.findOne(id);
  if (!accion) {
    throw new NotFoundException(`No existe una Accion con id: ${id}`);
  }

  if (updateAccionDto.reclamoId) {
    const reclamo = await this.verificarExistenciaReclamo(updateAccionDto.reclamoId);

    const estadoActualId = reclamo.estadoId.toString();
    const areaOrigenId = reclamo.areaId.toString();

    await this.verificarExistenciaArea(areaOrigenId);
    await this.verificarExistenciaEstado(estadoActualId);
  }

  if (updateAccionDto.areaDestinoId) {
    await this.verificarExistenciaArea(updateAccionDto.areaDestinoId);
  }

  if (updateAccionDto.estadoNuevoId) {
    await this.verificarExistenciaEstado(updateAccionDto.estadoNuevoId);
  }

  if (updateAccionDto.responsableId) {
    await this.verificarExistenciaUsuario(updateAccionDto.responsableId);
  }

  return this.accionRepository.update(id, updateAccionDto);
}


  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    const accion = await this.accionRepository.findOne(id);
    if (!accion) {
      this.logger.error(`${this.ENTITY_NAME} con id ${id} no existe`);
      throw new NotFoundException(`No existe un ${this.ENTITY_NAME} con id: ${id}`);
    }
    return this.accionRepository.remove(id);
  }

  private verificarExistenciaReclamo(reclamoId: string): Promise<Reclamo> {
    const reclamo = this.reclamoService.findOne(reclamoId)

    if (!reclamo) {
      this.logger.error(`Reclamo con id: ${reclamoId} no existe`);
      throw new NotFoundException(`No existe un Reclamo con id: ${reclamoId}`);
      }

    return reclamo;
  }

  private async verificarExistenciaUsuario(usuarioId: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findOne(usuarioId)

    if (!usuario) {
      this.logger.error(`Usuario con id: ${usuarioId} no existe`);
      throw new NotFoundException(`No existe un Usuario con id: ${usuarioId}`);
      }

    return usuario;
  }

  private async verificarExistenciaArea(areaId: string): Promise<Area> {
    const area = await this.areaService.findOne(areaId)

    if (!area) {
      this.logger.error(`Area con id: ${areaId} no existe`);
      throw new NotFoundException(`No existe un Area con id: ${areaId}`);
      }

    return area;
  }

  private async verificarExistenciaEstado(estadoId: string): Promise<Estado> {
    const estado = await this.estadoService.findById(estadoId)
    if (!estado) {
      this.logger.error(`Estado con id: ${estadoId} no existe`);
      throw new NotFoundException(`No existe un Estado con id: ${estadoId}`);
      }

    return estado;
  }
}
