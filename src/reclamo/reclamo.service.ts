import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import type { IReclamoRepository } from './IReclamoRepository';

@Injectable()
export class ReclamoService {
  private readonly logger = new Logger(ReclamoService.name);

  constructor(
    @Inject('IReclamoRepository')
    private readonly reclamoRepository: IReclamoRepository,
  ) {}

  create(createReclamoDto: CreateReclamoDto) {
    return 'This action adds a new reclamo';
  }

  findAll() {
    return `This action returns all reclamo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reclamo`;
  }

  update(id: number, updateReclamoDto: UpdateReclamoDto) {
    return `This action updates a #${id} reclamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} reclamo`;
  }
}
