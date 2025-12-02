import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import type { IEstadoRepository } from './IEstadoRepository';

@Injectable()
export class EstadoService {
  private readonly logger = new Logger(EstadoService.name);
  private readonly ENTITY_NAME = 'Estado';

  constructor(
    @Inject('IEstadoRepository')
    private readonly estadoRepository: IEstadoRepository,
  ) {}

  async create(createEstadoDto: CreateEstadoDto) {
    this.logger.log(`Creando un nuevo estado con nombre: ${createEstadoDto.nombre}`, );
    await this.validarExisteNombre (createEstadoDto.nombre);
    const entity = await this.estadoRepository.create(createEstadoDto);
    return entity;
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    const entities = await this.estadoRepository.findAll();
    return entities;
  }

  async findById(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`, );
    const entity =  await this.estadoRepository.findById(id);
    return entity;
  }

  async findByName(nombre: string) {
    return this.estadoRepository.findByName(nombre);
  }

  async update(id: string, updateEstadoDto: UpdateEstadoDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    await this.estadoRepository.findById(id);
    const entity = await this.estadoRepository.update(id, updateEstadoDto);
    return entity;
  }

  async remove(id: string) {
    this .logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    return this.estadoRepository.remove(id);
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.estadoRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.warn(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new Error(`El nombre ${nombre} ya existe.`);
    }
  }
}
