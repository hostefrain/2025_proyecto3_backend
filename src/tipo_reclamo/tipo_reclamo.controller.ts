import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoReclamoService } from './tipo_reclamo.service';
import { CreateTipoReclamoDto } from './dto/create-tipo_reclamo.dto';
import { UpdateTipoReclamoDto } from './dto/update-tipo_reclamo.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('tipo-reclamo')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TipoReclamoController {
  constructor(private readonly tipoReclamoService: TipoReclamoService) {}

  @Post()
  @Roles('admin')
  create(@Body() createTipoReclamoDto: CreateTipoReclamoDto) {
    return this.tipoReclamoService.create(createTipoReclamoDto);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.tipoReclamoService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.tipoReclamoService.findById(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTipoReclamoDto: UpdateTipoReclamoDto) {
    return this.tipoReclamoService.update(id, updateTipoReclamoDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.tipoReclamoService.remove(id);
  }
}
