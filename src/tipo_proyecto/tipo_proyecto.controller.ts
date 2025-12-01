import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoProyectoService } from './tipo_proyecto.service';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';

@Controller('tipo-proyecto')
export class TipoProyectoController {
  constructor(private readonly tipoProyectoService: TipoProyectoService) {}

  @Post()
  create(@Body() createTipoProyectoDto: CreateTipoProyectoDto) {
    return this.tipoProyectoService.create(createTipoProyectoDto);
  }

  @Get()
  findAll() {
    return this.tipoProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoProyectoDto: UpdateTipoProyectoDto) {
    return this.tipoProyectoService.update(+id, updateTipoProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoProyectoService.remove(+id);
  }
}
