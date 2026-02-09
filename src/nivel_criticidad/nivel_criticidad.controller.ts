import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NivelCriticidadService } from './nivel_criticidad.service';
import { CreateNivelCriticidadDto } from './dto/create-nivel_criticidad.dto';
import { UpdateNivelCriticidadDto } from './dto/update-nivel_criticidad.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('nivel-criticidad')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NivelCriticidadController {
  constructor(private readonly nivelCriticidadService: NivelCriticidadService) {}

  @Post()
  @Roles('admin')
  create(@Body() createNivelCriticidadDto: CreateNivelCriticidadDto) {
    return this.nivelCriticidadService.create(createNivelCriticidadDto);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.nivelCriticidadService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.nivelCriticidadService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateNivelCriticidadDto: UpdateNivelCriticidadDto) {
    return this.nivelCriticidadService.update(id, updateNivelCriticidadDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.nivelCriticidadService.remove(id);
  }
}
