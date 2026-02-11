import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import type { IProyectoRepository } from './IProyectoRepository';
import { TipoProyectoService } from 'src/tipo_proyecto/tipo_proyecto.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { TipoProyecto } from 'src/tipo_proyecto/schema/tipo_proyecto.schema';

@Injectable()
export class ProyectoService {
  private readonly logger = new Logger(ProyectoService.name);
  private readonly ENTITY_NAME = 'Proyecto';

  constructor(
    private tipoProyectoService: TipoProyectoService,
    private clienteService: ClienteService,
    @Inject('IProyectoRepository')
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    this.logger.log(`Creando nuevo ${this.ENTITY_NAME}`);
    const { nombre, clienteId, tipoProyectoId} = createProyectoDto;

    await this.verificarExistenciaTipoProyecto(tipoProyectoId);
    await this.verificarExistenciaCliente(clienteId);
    await this.verificarExistenciaNombre(nombre);

    return this.proyectoRepository.create(createProyectoDto);
  }

  async findAll() {
    this.logger.log(`Buscando todos los ${this.ENTITY_NAME}s`);
    return this.proyectoRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`);
    return this.proyectoRepository.findOne(id);
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id ${id}`);

    this.verificarExistenciaProyecto(id);

    if (updateProyectoDto.tipoProyectoId) {
      await this.verificarExistenciaTipoProyecto(updateProyectoDto.tipoProyectoId);
    }

    if (updateProyectoDto.clienteId) {
      await this.verificarExistenciaCliente(updateProyectoDto.clienteId);
    }

    if (updateProyectoDto.nombre) {
      await this.verificarExistenciaNombre(updateProyectoDto.nombre);
    }

    return this.proyectoRepository.update(id, updateProyectoDto)
    
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    await this.verificarExistenciaProyecto(id);
    return this.proyectoRepository.remove(id);
  }

  private async verificarExistenciaTipoProyecto(tipoProyectoId: string): Promise<TipoProyecto> {
    const tipoProyecto = await this.tipoProyectoService.findById(tipoProyectoId);
    if (!tipoProyecto) {
      this.logger.error(`TipoProyecto con id ${tipoProyectoId} no existe`);
      throw new NotFoundException(`No existe un TipoProyecto con id: ${tipoProyectoId}`);
    }
    return tipoProyecto;
  }

  private async verificarExistenciaCliente(clienteId: string) {
    const cliente = await this.clienteService.findById(clienteId);
    if (!cliente) {
      this.logger.error(`Cliente con id ${clienteId} no existe`);
      throw new NotFoundException(`No existe un Cliente con id: ${clienteId}`);
    }
    return cliente;
  }

  private async verificarExistenciaNombre(nombre: string) {
    const proyecto = await this.proyectoRepository.findByName(nombre);
    if (proyecto) {
      this.logger.error(`Proyecto con nombre ${nombre} ya existe`);
      throw new NotFoundException(`Proyecto con nombre ${nombre} ya existe`);
    }
    return proyecto;
  }

  private async verificarExistenciaProyecto(id: string) {
    const proyecto = await this.proyectoRepository.findOne(id);
    if (!proyecto) {
      this.logger.error(`Proyecto con id ${id} no existe`);
      throw new NotFoundException(`No existe un Proyecto con id: ${id}`);
    }
    return proyecto;
  }
}
