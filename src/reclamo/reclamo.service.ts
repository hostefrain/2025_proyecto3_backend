import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import type { IReclamoRepository } from './IReclamoRepository';
import { TipoReclamoService } from 'src/tipo_reclamo/tipo_reclamo.service';
import { PrioridadService } from 'src/prioridad/prioridad.service';
import { NivelCriticidadService } from 'src/nivel_criticidad/nivel_criticidad.service';
import { EstadoService } from 'src/estado/estado.service';
import { ProyectoService } from 'src/proyecto/proyecto.service';
import { AreaService } from 'src/area/area.service';

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
    this.logger.debug('CreateReclamoDto recibido:', createReclamoDto);
    
    const tipoReclamo = await this.tipoReclamoService.findById(createReclamoDto.tipoReclamoId)
    if (!tipoReclamo){
      this.logger.error(`TipoReclamo con id: ${createReclamoDto.tipoReclamoId} no existe`);
      throw new NotFoundException('Tipo de Reclamo no existe')
    }

    const prioridad = await this.prioridadService.findOne(createReclamoDto.prioridadId)
    if (!prioridad){
      this.logger.error(`Prioridad con id: ${createReclamoDto.prioridadId} no existe`);
      throw new NotFoundException('Prioridad no existe')
    }

    const nivel_criticidad = await this.nivelCriticidadService.findOne(createReclamoDto.nivelCriticidadId);
    if (!nivel_criticidad) {
      this.logger.error(`Nivel de criticadad con id: ${createReclamoDto.nivelCriticidadId} no existe`);
      throw new NotFoundException('Nivel de criticidad no existe')
    }

    const estado = await this.estadoService.findById(createReclamoDto.estadoId);
    if (!estado) {
      this.logger.error(`Estado con id: ${createReclamoDto.estadoId} no existe`);
      throw new NotFoundException('Estado no existe')
    }

    const area = await this.areaService.findOne(createReclamoDto.areaId)
    if (!area) {
      this.logger.error(`Area con id: ${createReclamoDto.areaId} no existe`);
      throw new NotFoundException('Area no existe')
    }

    const proyecto = await this.proyectoService.findOne(createReclamoDto.proyectoId);
    if (!proyecto) {
      this.logger.error(`Proyecto con id: ${createReclamoDto.proyectoId} no existe`);
      throw new NotFoundException('Proyecto no existe')
    }
    const archivosPaths = archivos?.map(a => a.filename) ?? [];
    const imagenesPaths = imagenes?.map(i => i.filename) ?? [];

    return this.reclamoRepository.create(createReclamoDto, archivosPaths, imagenesPaths)
  }

  async findAll() {
    return this.reclamoRepository.findAll();
  }

  async findOne(id: string) {
    const reclamo = await this.reclamoRepository.findOne(id);

    if (!reclamo) {
      throw new NotFoundException(`No existe un Reclamo con id: ${id}`);
    }

    return reclamo;
  }

  async update(id: string, dto: UpdateReclamoDto, archivos?: Express.Multer.File[], imagenes?: Express.Multer.File[]) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id ${id}`);
    const reclamo = await this.reclamoRepository.findOne(id)
    if (!reclamo) {
      this.logger.error(`Proyecto con id ${id} no existe`);
      throw new NotFoundException(`No existe un Reclamo con id: ${id}`);
    }
    const archivosPaths = archivos?.map(a => a.filename) ?? [];
    const imagenesPaths = imagenes?.map(i => i.filename) ?? [];

    return this.reclamoRepository.update(id, dto, archivosPaths, imagenesPaths)

  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    const reclamo = await this.reclamoRepository.findOne(id)
    if (!reclamo) {
      this.logger.error(`Proyecto con id ${id} no existe`);
      throw new NotFoundException(`No existe un Reclamo con id: ${id}`);
    }
    return this.reclamoRepository.remove(id);
  }
}
