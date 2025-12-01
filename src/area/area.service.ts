import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import type{ IAreaRepository } from './IAreaRepository';

@Injectable()
export class AreaService {
  private readonly logger = new Logger(AreaService.name);
  
  constructor(
    @Inject('IAreaRepository') 
    private readonly areaRepository: IAreaRepository,
  ) {}
  create(createAreaDto: CreateAreaDto) {
    return 'This action adds a new area';
  }

  findAll() {
    return `This action returns all area`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
