import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import type { IUsuarioRepository } from './IUsuarioRepository';

import * as bcrypt from 'bcrypt';
import { RolService } from 'src/rol/rol.service';
import { AreaService } from 'src/area/area.service';
import { UsuarioDocument } from './schema/usuario.schema';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);
  private readonly ENTITY_NAME = 'Usuario'

  constructor(
    private readonly rolService: RolService,
    private readonly areaService: AreaService,
    @Inject('IUsuarioRepository')
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    this.logger.log(`Creando nuevo ${this.ENTITY_NAME}`);
    await this.validarExisteNombre(createUsuarioDto.nombre);

    this.validarRol(createUsuarioDto.rolId);
    this.validarArea(createUsuarioDto.areaId);
  
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10)
    
    return this.usuarioRepository.create({
      ...createUsuarioDto,
      contrasena: hashedPassword,
      rolId: createUsuarioDto.rolId,
      areaId: createUsuarioDto.areaId,
    });
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    return this.usuarioRepository.findAll()
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`, );
    return await this.usuarioRepository.findOne(id)

  }

  async findByName(nombre:string): Promise<UsuarioDocument | null> {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con nombre ${nombre}`, );
    return await this.usuarioRepository.findByName(nombre)
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    this.validarExisteId(id);
    return await this.usuarioRepository.update(id, updateUsuarioDto)
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    this.validarExisteId(id);
    return await this.usuarioRepository.remove(id)
  }

  private async validarRol(idRol :string) {
    const rol = await this.rolService.findOne(idRol);

    if (!rol) {
      this.logger.error(`Rol con id: ${idRol} no existee`);
      throw new NotFoundException('Rol no existee')
    }
  }

  private async validarArea(idArea:string) {
    const area = await this.areaService.findOne(idArea);

    if (!area) {
      this.logger.error(`Area con id: ${idArea} no existee`)
      throw new NotFoundException('Area no existee')
    }
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.usuarioRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.warn(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new Error(`El nombre ${nombre} ya existe.`);
    }
  }

  private async validarExisteId(idUsuario: string) {
    const usuario = await this.findOne(idUsuario);

    if (!usuario) {
      this.logger.error(`Usario con id: ${idUsuario} no existee`);
      throw new NotFoundException('Usuario no existee')
    }
  }
}
