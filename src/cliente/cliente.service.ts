import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import type { IClienteRepository } from './IClienteRepository';
import { Cliente } from './schemas/cliente.schema';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);
  private readonly ENTITY_NAME = 'Cliente';

  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
   this.logger.log(`Creando nuevo ${this.ENTITY_NAME}`);
   await this.validarExisteNombre(createClienteDto.nombre);

   return this.clienteRepository.create(createClienteDto)    
  }

  async findAll() {
    this.logger.log(`Buscando todos los ${this.ENTITY_NAME}s`);
    return this.clienteRepository.findAll();
  }

  async findById(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`)
    const cliente = await this.validarExisteId(id);
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id ${id}`);
    await this.validarExisteId(id);

    if (updateClienteDto.nombre) 
      {await this.validarExisteNombre(updateClienteDto.nombre);}

    return this.clienteRepository.update(id, updateClienteDto)
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    await this.validarExisteId(id);
    return this.clienteRepository.remove(id);

  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingCliente = await this.clienteRepository.findByName(nombre);
    if (existingCliente) {
      this.logger.error(`Cliente con nombre: ${nombre} ya existe`)
      throw new InternalServerErrorException(`Cliente con nombre ${nombre} ya existe`)
    }
  }

  private async validarExisteId(idCliente: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(idCliente);
    if (!cliente) {
      this.logger.error(`Cliente con id: ${idCliente} no existe`)
      throw new InternalServerErrorException(`Cliente con id ${idCliente} no existe`)
    }

    return cliente;
  }
}
