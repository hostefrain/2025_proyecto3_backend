import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from './schema/proyecto.schema';
import { ProyectoRepository } from './proyecto.repository';
import { TipoProyectoModule } from 'src/tipo_proyecto/tipo_proyecto.module';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proyecto.name, schema: ProyectoSchema }]),
    TipoProyectoModule,
    ClienteModule,
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
