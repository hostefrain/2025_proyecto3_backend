import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoProyectoService } from './tipo_proyecto.service';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('tipo-proyecto')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TipoProyectoController {
  constructor(private readonly tipoProyectoService: TipoProyectoService) {}

  @Post()
  @Roles('admin')
  create(@Body() createTipoProyectoDto: CreateTipoProyectoDto) {
    return this.tipoProyectoService.create(createTipoProyectoDto);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.tipoProyectoService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.tipoProyectoService.findById(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTipoProyectoDto: UpdateTipoProyectoDto) {
    return this.tipoProyectoService.update(id, updateTipoProyectoDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.tipoProyectoService.remove(id);
  }
}
