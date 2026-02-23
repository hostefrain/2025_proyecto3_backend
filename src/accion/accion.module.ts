import { Module } from '@nestjs/common';
import { AccionService } from './accion.service';
import { AccionController } from './accion.controller';
import { AccionRepository } from './accion.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Accion, AccionSchema } from '../accion/schemas/accion.schema';
import { AreaModule } from 'src/area/area.module';
import { ReclamoModule } from 'src/reclamo/reclamo.module';
import { EstadoModule } from 'src/estado/estado.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AccionValidator } from './accion.validator';


@Module({
    imports: [
    MongooseModule.forFeature([{ name: Accion.name, schema: AccionSchema }]),
    AreaModule,
    ReclamoModule,
    EstadoModule,
    UsuarioModule,
  ],

  controllers: [AccionController],
  providers: [
    AccionService,
    AccionValidator,
    {
      provide: 'IAccionRepository',
      useClass: AccionRepository,
    },
  ],
  exports: [AccionService],
})
export class AccionModule {}
