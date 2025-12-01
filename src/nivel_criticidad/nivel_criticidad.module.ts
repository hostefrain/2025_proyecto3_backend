import { Module } from '@nestjs/common';
import { NivelCriticidadService } from './nivel_criticidad.service';
import { NivelCriticidadController } from './nivel_criticidad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NivelCriticidadRepository } from './nivel_criticidad.repository';
import { NivelCriticidad, NivelCriticidadSchema } from './schemas/nivel_criticidad.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NivelCriticidad.name, schema: NivelCriticidadSchema }]),
  ],
  controllers: [NivelCriticidadController],
  providers: [
    NivelCriticidadService,
  {
      provide: 'INivelCriticidadRepository',
      useClass: NivelCriticidadRepository,
  }
  ],
  exports: [NivelCriticidadService],
})
export class NivelCriticidadModule {}
