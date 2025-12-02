import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import type { IReclamoRepository } from './IReclamoRepository';
import { TipoReclamoService } from 'src/tipo_reclamo/tipo_reclamo.service';

@Injectable()
export class ReclamoService {
  private readonly logger = new Logger(ReclamoService.name);

  constructor(
    @Inject('IReclamoRepository')
    private readonly reclamoRepository: IReclamoRepository,
  ) {}

  async create(createReclamoDto: CreateReclamoDto) {}

  async findAll() {
    return this.reclamoRepository.findAll();
  }

  async findOne(id: string) {
    return this.reclamoRepository.findOne(id);
  }

  async update(id: string, updateReclamoDto: UpdateReclamoDto) {
  }

  async remove(id: string) {
  }
}
