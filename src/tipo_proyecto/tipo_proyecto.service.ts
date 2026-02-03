import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';
import type { ITipo_proyectoRepository } from './ITipo_proyectoRepository';

@Injectable()
export class TipoProyectoService {
  private readonly logger = new Logger(TipoProyectoService.name);
  private readonly ENTITY_NAME = 'TipoProyecto';

  constructor(
    @Inject('ITipoProyectoRepository')
    private readonly tipoProyectoRepository: ITipo_proyectoRepository,
  ) {}
  
  async create(createTipoProyectoDto: CreateTipoProyectoDto) {
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con nombre ${createTipoProyectoDto.nombre}`, );
    await this.validarExisteNombre (createTipoProyectoDto.nombre);
    const entity = await this.tipoProyectoRepository.create(createTipoProyectoDto);
    return entity;
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    const entities = await this.tipoProyectoRepository.findAll();
    return entities;
  }

  async findById(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`, );
    const entity =  await this.tipoProyectoRepository.findByID(id);
    return entity;
  }

  async update(id: string, updateTipoProyectoDto: UpdateTipoProyectoDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    this.verificarExistenciaTipoProyecto(id);
    const entity = await this.tipoProyectoRepository.update(id, updateTipoProyectoDto);
    return entity;
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    this.verificarExistenciaTipoProyecto(id);
    return this.tipoProyectoRepository.remove(id);
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.tipoProyectoRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.error(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El nombre ${nombre} ya existe.`);
    }
  }

  private async verificarExistenciaTipoProyecto(idTipoProyecto: string) : Promise<any> {
    const tipo_proyecto = await this.tipoProyectoRepository.findByID(idTipoProyecto);
    if (!tipo_proyecto) {
      this.logger.error(`El id ${idTipoProyecto} no existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El id ${idTipoProyecto} no existe.`);
    }
    return tipo_proyecto;
  }
}
