import { Module } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { ReclamoController } from './reclamo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamo, ReclamoSchema } from './schemas/reclamo.schema';
import { ReclamoRepository } from './reclamo.repository';

// MÓDULOS EXTERNOS RELACIONADOS
import { ProyectoModule } from 'src/proyecto/proyecto.module';
import { TipoReclamoModule } from 'src/tipo_reclamo/tipo_reclamo.module';
import { PrioridadModule } from 'src/prioridad/prioridad.module';
import { NivelCriticidadModule } from 'src/nivel_criticidad/nivel_criticidad.module'; // CONFIRMAR NOMBRE
import { EstadoModule } from 'src/estado/estado.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reclamo.name, schema: ReclamoSchema }]),
    ProyectoModule,
    TipoReclamoModule,
    PrioridadModule,
    NivelCriticidadModule,
    EstadoModule,
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
