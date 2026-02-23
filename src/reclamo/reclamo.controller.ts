import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { multerConfig } from '../config/multer.config'; // Importa la config
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Reclamos')
@Controller('reclamo')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReclamoController {
  constructor(private readonly reclamoService: ReclamoService) {}

  @Post()
  @Roles('admin', 'user')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'archivos', maxCount: 10 },
        { name: 'imagenes', maxCount: 10 },
      ],
      multerConfig,
    ),
  )
  create(
    @Body() createReclamoDto: CreateReclamoDto,
    @UploadedFiles()
    files: {
      archivos?: Express.Multer.File[];
      imagenes?: Express.Multer.File[];
    },
  ) {
    console.log('FILES:', files);
    console.log('DTO:', createReclamoDto);
    return this.reclamoService.create(
      createReclamoDto,
      files.archivos ?? [],
      files.imagenes ?? [],
    );
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.reclamoService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.reclamoService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'user')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'archivos', maxCount: 10 },
        { name: 'imagenes', maxCount: 10 },
      ],
      multerConfig,
    ),
  )
  update(
    @Param('id') id: string,
    @Body() updateReclamoDto: UpdateReclamoDto,
    @UploadedFiles()
    files: {
      archivos?: Express.Multer.File[];
      imagenes?: Express.Multer.File[];
    },
  ) {
    return this.reclamoService.update(
      id,
      updateReclamoDto,
      files.archivos ?? [],
      files.imagenes ?? [],
    );
  }

  @Delete(':id')
  @Roles('admin', 'user')
  remove(@Param('id') id: string) {
    return this.reclamoService.remove(id);
  }
}
