import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import type { IProyectoRepository } from './IProyectoRepository';

@Injectable()
export class ProyectoService {
  private readonly logger = new Logger(ProyectoService.name);

  constructor(
    @Inject('IProyectoRepository')
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  create(createProyectoDto: CreateProyectoDto) {
    return 'This action adds a new proyecto';
  }

  findAll() {
    return `This action returns all proyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyecto`;
  }

  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
