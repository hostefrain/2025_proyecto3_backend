import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateNivelCriticidadDto } from './dto/create-nivel_criticidad.dto';
import { UpdateNivelCriticidadDto } from './dto/update-nivel_criticidad.dto';
import type { INivelCriticidadRepository } from './INivel_criticidadRepository';

@Injectable()
export class NivelCriticidadService {
  private readonly logger = new Logger(NivelCriticidadService.name);

  constructor(
    @Inject('INivelCriticidadRepository') 
    private readonly nivelCriticidadRepository: INivelCriticidadRepository,
  ) {}
  
  create(createNivelCriticidadDto: CreateNivelCriticidadDto) {
    return 'This action adds a new nivelCriticidad';
  }

  findAll() {
    return `This action returns all nivelCriticidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nivelCriticidad`;
  }

  update(id: number, updateNivelCriticidadDto: UpdateNivelCriticidadDto) {
    return `This action updates a #${id} nivelCriticidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} nivelCriticidad`;
  }
}
