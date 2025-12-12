import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { multerConfig } from '../config/multer.config'; // Importa la config

@ApiTags('Reclamos')
@Controller('reclamo')
export class ReclamoController {
  constructor(private readonly reclamoService: ReclamoService) {}

  @Post()
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
  findAll() {
    return this.reclamoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reclamoService.findOne(id);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.reclamoService.remove(id);
  }
}
