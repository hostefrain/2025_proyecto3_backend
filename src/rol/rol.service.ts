import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import type { IRolRepository } from './IRolRepository';

@Injectable()
export class RolService {
  private readonly logger = new Logger(RolService.name);

  constructor(
    @Inject('IRolRepository')
    private readonly rolRepository: IRolRepository,
  ) {}

  create(createRolDto: CreateRolDto) {
    return 'This action adds a new rol';
  }

  findAll() {
    return `This action returns all rol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
