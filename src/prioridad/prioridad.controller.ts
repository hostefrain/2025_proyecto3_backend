import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrioridadService } from './prioridad.service';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';
import { UpdatePrioridadDto } from './dto/update-prioridad.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('prioridad')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrioridadController {
  constructor(private readonly prioridadService: PrioridadService) {}

  @Post()
  @Roles('admin')
  create(@Body() createPrioridadDto: CreatePrioridadDto) {
    return this.prioridadService.create(createPrioridadDto);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.prioridadService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.prioridadService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updatePrioridadDto: UpdatePrioridadDto) {
    return this.prioridadService.update(id, updatePrioridadDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.prioridadService.remove(id);
  }
}
