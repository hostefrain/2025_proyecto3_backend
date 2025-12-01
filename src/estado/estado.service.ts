import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import type { IEstadoRepository } from './IEstadoRepository';

@Injectable()
export class EstadoService {
  private readonly logger = new Logger(EstadoService.name);

  constructor(
    @Inject('IEstadoRepository')
    private readonly estadoRepository: IEstadoRepository,
  ) {}

  create(createEstadoDto: CreateEstadoDto) {
    return 'This action adds a new estado';
  }

  findAll() {
    return `This action returns all estado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estado`;
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return `This action updates a #${id} estado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
