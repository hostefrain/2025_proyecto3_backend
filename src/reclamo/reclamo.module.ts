import { Module } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { ReclamoController } from './reclamo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamo, ReclamoSchema } from './schemas/reclamo.schema';
import { ReclamoRepository } from './reclamo.repository';
import { TipoReclamoModule } from 'src/tipo_reclamo/tipo_reclamo.module';
import { PrioridadModule } from 'src/prioridad/prioridad.module';
import { NivelCriticidadModule } from 'src/nivel_criticidad/nivel_criticidad.module';
import { EstadoModule } from 'src/estado/estado.module';
import { ProyectoModule } from 'src/proyecto/proyecto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reclamo.name, schema: ReclamoSchema }]),
    TipoReclamoModule,
    PrioridadModule,
    NivelCriticidadModule,
    EstadoModule,
    ProyectoModule,
  ],
  controllers: [ReclamoController],
  providers: [
    ReclamoService,
    {
      provide: 'IReclamoRepository',
      useClass: ReclamoRepository,
    },
  ],
  exports: [ReclamoService],
})
export class ReclamoModule {}
