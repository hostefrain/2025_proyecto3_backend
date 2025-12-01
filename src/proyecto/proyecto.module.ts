import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from './schema/proyecto.schema';
import { ProyectoRepository } from './proyecto.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proyecto.name, schema: ProyectoSchema }]),
  ],

  controllers: [ProyectoController],
  providers: [ProyectoService,
    {
      provide: 'IProyectoRepository',
      useClass: ProyectoRepository,
    }
  ],
  exports: [ProyectoService],
})
export class ProyectoModule {}
