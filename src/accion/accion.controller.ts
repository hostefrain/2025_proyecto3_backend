import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccionService } from './accion.service';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('accion')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccionController {
  constructor(private readonly accionService: AccionService) {}

  @Post()
  @Roles('admin', 'user')
  create(@Body() createAccionDto: CreateAccionDto) {
    return this.accionService.create(createAccionDto);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.accionService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.accionService.findOne(id);
  }

  @Get('reclamo/:reclamoId')
  @Roles('admin', 'user')
  findByReclamo(@Param('reclamoId') reclamoId: string) {
    return this.accionService.findByReclamo(reclamoId);
  }

  @Patch(':id')
  @Roles('admin', 'user')
  update(@Param('id') id: string, @Body() updateAccionDto: UpdateAccionDto) {
    return this.accionService.update(id, updateAccionDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.accionService.remove(id);
  }
}
