import { Module } from '@nestjs/common';
import { TipoProyectoService } from './tipo_proyecto.service';
import { TipoProyectoController } from './tipo_proyecto.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoProyecto, TipoProyectoSchema } from './schema/tipo_proyecto.schema';
import { TipoProyectoRepository } from './tipo_proyecto.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TipoProyecto.name, schema: TipoProyectoSchema }]),
  ],
  controllers: [TipoProyectoController],
  providers: [TipoProyectoService,
    {
      provide: 'ITipoProyectoRepository',
      useClass: TipoProyectoRepository,
    }
  ],
  exports: [TipoProyectoService],
})
export class TipoProyectoModule {}
