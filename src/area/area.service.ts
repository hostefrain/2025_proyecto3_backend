import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import type{ IAreaRepository } from './IAreaRepository';

@Injectable()
export class AreaService {
  private readonly logger = new Logger(AreaService.name);
  private readonly ENTITY_NAME = 'Area';
  
  constructor(
    @Inject('IAreaRepository') 
    private readonly areaRepository: IAreaRepository,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con nombre: ${createAreaDto.nombre}`, );

    const area = await this.areaRepository.findByName(createAreaDto.nombre)

    if (area) {
      this.logger.error(`Area con nombre ${createAreaDto.nombre} ya existe`);
      throw new InternalServerErrorException(`Area con nombre ${createAreaDto.nombre} ya existe`);
    }

    return this.areaRepository.create(createAreaDto);

  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    return this.areaRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con ID: ${id} `,);
    return this.areaRepository.findOne(id);
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );

    const areaEntity = await this.findOne(id);

    if (!areaEntity) {
      this.logger.error(`${this.ENTITY_NAME} con id: ${id} no existe`);
      throw new InternalServerErrorException(`${this.ENTITY_NAME} con id: ${id} no existe`);
    }

    if (updateAreaDto.nombre) {
      const area = await this.areaRepository.findByName(updateAreaDto.nombre)

      if (area) {
        this.logger.error(`Area con nombre ${updateAreaDto.nombre} ya existe`);
        throw new InternalServerErrorException(`Area con nombre ${updateAreaDto.nombre} ya existe`);
      }
    }

    return this.areaRepository.update(id, updateAreaDto);
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );

    const areaEntity = await this.findOne(id);

    if (!areaEntity) {
      this.logger.error(`${this.ENTITY_NAME} con id: ${id} no existe`);
      throw new InternalServerErrorException(`${this.ENTITY_NAME} con id: ${id} no existe`);
    }
    
    return this.areaRepository.remove(id);
  }
}
