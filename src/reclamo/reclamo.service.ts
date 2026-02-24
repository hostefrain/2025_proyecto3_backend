import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import type { IReclamoRepository } from './IReclamoRepository';
import { TipoReclamoService } from '../tipo_reclamo/tipo_reclamo.service';
import { PrioridadService } from '../prioridad/prioridad.service';
import { NivelCriticidadService } from '../nivel_criticidad/nivel_criticidad.service';
import { EstadoService } from '../estado/estado.service';
import { ProyectoService } from '../proyecto/proyecto.service';
import { AreaService } from '../area/area.service';
import { EstadoDocument } from '../estado/schemas/estado.schema';

@Injectable()
export class ReclamoService {
  private readonly logger = new Logger(ReclamoService.name);
  private readonly ENTITY_NAME = 'Reclamo';

  constructor(
    private tipoReclamoService: TipoReclamoService,
    private prioridadService: PrioridadService,
    private nivelCriticidadService: NivelCriticidadService,
    private estadoService: EstadoService,
    private proyectoService: ProyectoService,
    private areaService: AreaService,
    @Inject('IReclamoRepository')
    private readonly reclamoRepository: IReclamoRepository
  ) {}

  async create(createReclamoDto: CreateReclamoDto, archivos?: Express.Multer.File[], imagenes?: Express.Multer.File[]) {
    this.logger.log(`Creando nuevo ${this.ENTITY_NAME}`);

    const estadoInicial = await this.estadoService.findByName('Nuevo') as EstadoDocument;
    
    if (!estadoInicial) {
      throw new NotFoundException('Estado inicial "Nuevo" no existe');
    }

    createReclamoDto.estadoId = estadoInicial._id.toString();


    this.verificarExistenciaTipoReclamo(createReclamoDto.tipoReclamoId);
    this.verificarExistenciaPrioridad(createReclamoDto.prioridadId);
    this.verificarExistenciaNivelCriticidad(createReclamoDto.nivelCriticidadId);
    this.verificarExistenciaArea(createReclamoDto.areaId);
    this.verificarExistenciaProyecto(createReclamoDto.proyectoId);

    const archivosPaths = archivos?.map(a => a.filename) ?? [];
    const imagenesPaths = imagenes?.map(i => i.filename) ?? [];
    console.log(createReclamoDto);

    return this.reclamoRepository.create(createReclamoDto, archivosPaths, imagenesPaths)
  }

  async findAll() {
    this.logger.log(`Buscando todos los ${this.ENTITY_NAME}s`);
    return this.reclamoRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`);
    const reclamo = await this.reclamoRepository.findOne(id);

    if (!reclamo) {
      throw new NotFoundException(`No existe un Reclamo con id: ${id}`);
    }

    return reclamo;
  }

  async findOneRaw(id: string) {
    return this.reclamoRepository.findOneRaw(id);
  }

  async update(id: string, dto: UpdateReclamoDto, archivos?: Express.Multer.File[], imagenes?: Express.Multer.File[]) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id ${id}`);
    await this.verificarExistenciaReclamo(id)
    const archivosPaths = archivos?.map(a => a.filename) ?? [];
    const imagenesPaths = imagenes?.map(i => i.filename) ?? [];

    return this.reclamoRepository.update(id, dto, archivosPaths, imagenesPaths)

  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    this.verificarExistenciaReclamo(id);
    return this.reclamoRepository.remove(id);
  }

  private async verificarExistenciaTipoReclamo(tipoReclamoId: string) {
    const tipoReclamo = await this.tipoReclamoService.findById(tipoReclamoId);
    if (!tipoReclamo) {
      this.logger.error(`TipoReclamo con id: ${tipoReclamoId} no existe`);
      throw new NotFoundException(`No existe un TipoReclamo con id: ${tipoReclamoId}`);
    }
    return tipoReclamo;
  }

  private async verificarExistenciaPrioridad(prioridadId: string) {
    const prioridad = await this.prioridadService.findOne(prioridadId);
    if (!prioridad) {
      this.logger.error(`Prioridad con id: ${prioridadId} no existe`);
      throw new NotFoundException(`No existe una Prioridad con id: ${prioridadId}`);
    }
    return prioridad;
  }

  private async verificarExistenciaNivelCriticidad(nivelCriticidadId: string) {
    const nivelCriticidad = await this.nivelCriticidadService.findOne(nivelCriticidadId);
    if (!nivelCriticidad) {
      this.logger.error(`NivelCriticidad con id: ${nivelCriticidadId} no existe`);
      throw new NotFoundException(`No existe un NivelCriticidad con id: ${nivelCriticidadId}`);
    }
    return nivelCriticidad;
  }

  private async verificarExistenciaEstado(estadoId: string) {
    const estado = await this.estadoService.findById(estadoId);
    if (!estado) {
      this.logger.error(`Estado con id: ${estadoId} no existe`);
      throw new NotFoundException(`No existe un Estado con id: ${estadoId}`);
    }
    return estado;
  }

  private async verificarExistenciaArea(areaId: string) {
    const area = await this.areaService.findOne(areaId);
    if (!area) {
      this.logger.error(`Area con id: ${areaId} no existe`);
      throw new NotFoundException(`No existe un Area con id: ${areaId}`);
    }
    return area;
  }

  private async verificarExistenciaProyecto(proyectoId: string) {
    const proyecto = await this.proyectoService.findOne(proyectoId);
    if (!proyecto) {
      this.logger.error(`Proyecto con id: ${proyectoId} no existe`);
      throw new NotFoundException(`No existe un Proyecto con id: ${proyectoId}`);
    }
    return proyecto;
  }

  private async verificarExistenciaReclamo(idReclamo: string) : Promise<any> {
    const reclamo = await this.reclamoRepository.findOne(idReclamo);
    if (!reclamo) {
      this.logger.error(`El id ${idReclamo} no existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El id ${idReclamo} no existe.`);
    }
    return reclamo;
  }
}
