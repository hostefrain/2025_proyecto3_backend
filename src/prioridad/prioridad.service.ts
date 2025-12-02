import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';
import { UpdatePrioridadDto } from './dto/update-prioridad.dto';
import type { IPrioridadRepository } from './IPrioridadRepository';

@Injectable()
export class PrioridadService {
  private readonly logger = new Logger(PrioridadService.name);
  private readonly ENTITY_NAME = 'Prioridad';

  constructor(
    @Inject('IPrioridadRepository')
    private readonly prioridadRepository: IPrioridadRepository,
  ) {}

  async create(createPrioridadDto: CreatePrioridadDto) {
    return this.prioridadRepository.create(createPrioridadDto);
  }

  async findAll() {
    return this.prioridadRepository.findAll();
  }

  async findOne(id: string) {
    return this.prioridadRepository.findOne(id);
  }

  async update(nombre: string, updatePrioridadDto: UpdatePrioridadDto) {
    return this.prioridadRepository.update(nombre, updatePrioridadDto);
  }

  async remove(id: string) {
    return this.prioridadRepository.remove(id);
  }
}
