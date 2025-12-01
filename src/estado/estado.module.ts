import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Estado, EstadoSchema } from './schemas/estado.schema';
import { EstadoRepository } from './estado.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Estado.name, schema: EstadoSchema }]),
  ],
  controllers: [EstadoController],
  providers: [
    EstadoService,
    {
      provide: 'IEstadoRepository',
      useClass: EstadoRepository,
    }
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
