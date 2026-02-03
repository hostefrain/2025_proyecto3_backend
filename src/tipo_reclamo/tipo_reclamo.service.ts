import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoReclamoDto } from './dto/create-tipo_reclamo.dto';
import { UpdateTipoReclamoDto } from './dto/update-tipo_reclamo.dto';
import type { ITipoReclamoRepository } from './ITipo_reclamoRepository';


@Injectable()
export class TipoReclamoService {
  private readonly logger = new Logger(TipoReclamoService.name);
  private readonly ENTITY_NAME = 'TipoReclamo';

  constructor(
    @Inject('ITipoReclamoRepository')
    private readonly tipoReclamoRepository: ITipoReclamoRepository,
  ) {}

  async create(createTipoReclamoDto: CreateTipoReclamoDto){
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con nombre ${createTipoReclamoDto.nombre}`, );
    await this.validarExisteNombre (createTipoReclamoDto.nombre);
    const entity = await this.tipoReclamoRepository.create(createTipoReclamoDto);
    return entity;
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    const entities = await this.tipoReclamoRepository.findAll();
    return entities;
  }

  async findById(id: string){
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`, );
    const entity =  await this.tipoReclamoRepository.findById(id);
    return entity;
  }

  async update(id: string, updateTipoReclamoDto: UpdateTipoReclamoDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    await this.validarExisteTipoReclamo(id);
    const entity = await this.tipoReclamoRepository.update(id, updateTipoReclamoDto);
    return entity;
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    await this.validarExisteTipoReclamo(id);
    return this.tipoReclamoRepository.remove(id);
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.tipoReclamoRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.warn(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new Error(`El nombre ${nombre} ya existe.`);
    }
  }

  private async validarExisteTipoReclamo(idTipoReclamo: string) : Promise<any> {
    const tipo_reclamo = await this.tipoReclamoRepository.findById(idTipoReclamo);
    if (!tipo_reclamo) {
      this.logger.warn(`El id ${idTipoReclamo} no existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El id ${idTipoReclamo} no existe.`);
    }
    return tipo_reclamo;
  }
}
