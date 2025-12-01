import { Module } from '@nestjs/common';
import { AccionService } from './accion.service';
import { AccionController } from './accion.controller';
import { AccionRepository } from './accion.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Accion, AccionSchema } from '../accion/schemas/accion.schema';


@Module({
    imports: [
    MongooseModule.forFeature([{ name: Accion.name, schema: AccionSchema }])
  ],

  controllers: [AccionController],
  providers: [
    AccionService,
    {
      provide: 'IAccionRepository',
      useClass: AccionRepository,
    },
  ],
  exports: [AccionService],
})
export class AccionModule {}
