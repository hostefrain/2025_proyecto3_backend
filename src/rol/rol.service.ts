import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import type { IRolRepository } from './IRolRepository';

@Injectable()
export class RolService {
  private readonly logger = new Logger(RolService.name);
  private readonly ENTITY_NAME = 'Rol'

  constructor(
    @Inject('IRolRepository')
    private readonly rolRepository: IRolRepository,
  ) {}

  async create(createRolDto: CreateRolDto) {
    this.logger.log(`Creando nuevo ${this.ENTITY_NAME}`);
    await this.validarExisteNombre(createRolDto.nombre)
    return await this.rolRepository.create(createRolDto)
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    return await this.rolRepository.findAll()
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`, );
    return await this.rolRepository.findOne(id);
  }

  async update(id: string, updateRolDto: UpdateRolDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    this.verificarExisteId(id);
    return await this.rolRepository.update(id, updateRolDto)
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    this.verificarExisteId(id)
    return this.rolRepository.remove(id)
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.rolRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.warn(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new Error(`El nombre ${nombre} ya existe.`);
    }
  }

  private async verificarExisteId(idRol : string) {
    const rol = await this.findOne(idRol)

    if (!rol) {
      this.logger.error(`Rol con id: ${idRol} no existee`);
      throw new NotFoundException('Rol no existee')
    }
  }

}
