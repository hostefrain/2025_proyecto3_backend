import { Module } from '@nestjs/common';
import { PrioridadService } from './prioridad.service';
import { PrioridadController } from './prioridad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prioridad, PrioridadSchema } from './schemas/prioridad.schema';
import { PrioridadRepository } from './prioridad.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prioridad.name, schema: PrioridadSchema }]),
  ],
  controllers: [PrioridadController],
  providers: [
    PrioridadService,
    {
      provide: 'IPrioridadRepository',
      useClass: PrioridadRepository,  
    }
  ],
  exports: [PrioridadService],
})
export class PrioridadModule {}
