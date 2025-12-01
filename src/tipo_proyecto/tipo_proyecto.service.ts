import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';
import type { ITipo_proyectoRepository } from './ITipo_proyectoRepository';

@Injectable()
export class TipoProyectoService {
  private readonly logger = new Logger(TipoProyectoService.name);

  constructor(
    @Inject('ITipoProyectoRepository')
    private readonly tipoProyectoRepository: ITipo_proyectoRepository,
  ) {}
  
  create(createTipoProyectoDto: CreateTipoProyectoDto) {
    return 'This action adds a new tipoProyecto';
  }

  findAll() {
    return `This action returns all tipoProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoProyecto`;
  }

  update(id: number, updateTipoProyectoDto: UpdateTipoProyectoDto) {
    return `This action updates a #${id} tipoProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoProyecto`;
  }
}
