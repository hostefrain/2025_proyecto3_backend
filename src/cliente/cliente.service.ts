import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import type { IClienteRepository } from './IClienteRepository';

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
   const cliente = await this.clienteRepository.findByName(createClienteDto.nombre);
   if (cliente) {
    this.logger.error(`Cliente con nombre: ${cliente.nombre} ya existe`)
    throw new InternalServerErrorException(`Cliente con nombre ${cliente.nombre} ya existe`)
   }

   return this.clienteRepository.create(createClienteDto)    
  }

  async findAll() {
    this.logger.log(`Buscando todos los ${this.ENTITY_NAME}s`);
    return this.clienteRepository.findAll();
  }

  async findById(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`)
    return this.clienteRepository.findById(id)
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id ${id}`);
    const cliente = await this.clienteRepository.findById(id)

    if(!cliente) {
      this.logger.error(`Cliente con id ${id} no existe`);
      throw new InternalServerErrorException(`Cliente con id ${id} no existe`);
    }

    return this.clienteRepository.update(id, updateClienteDto)
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    const cliente = await this.clienteRepository.findById(id)

    if (!cliente) {
      this.logger.error(`Proyecto con id ${id} no existe`);
      throw new InternalServerErrorException(`Proyecto con id ${id} no existe`);
    }

    return this.clienteRepository.remove(id)
    
  }

}
