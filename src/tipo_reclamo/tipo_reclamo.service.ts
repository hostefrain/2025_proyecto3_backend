import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTipoReclamoDto } from './dto/create-tipo_reclamo.dto';
import { UpdateTipoReclamoDto } from './dto/update-tipo_reclamo.dto';
import type { ITipoReclamoRepository } from './ITipo_reclamoRepository';

@Injectable()
export class TipoReclamoService {
  private readonly logger = new Logger(TipoReclamoService.name);

  constructor(
    @Inject('ITipoReclamoRepository')
    private readonly tipoReclamoRepository: ITipoReclamoRepository,
  ) {}

  create(createTipoReclamoDto: CreateTipoReclamoDto) {
    return 'This action adds a new tipoReclamo';
  }

  findAll() {
    return `This action returns all tipoReclamo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoReclamo`;
  }

  update(id: number, updateTipoReclamoDto: UpdateTipoReclamoDto) {
    return `This action updates a #${id} tipoReclamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoReclamo`;
  }
}
