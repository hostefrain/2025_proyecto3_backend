import { Module } from '@nestjs/common';
import { TipoReclamoService } from './tipo_reclamo.service';
import { TipoReclamoController } from './tipo_reclamo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoReclamo, TipoReclamoSchema } from './schema/tipo_reclamo.schema';
import { TipoReclamoRepository } from './tipo_reclamo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TipoReclamo.name, schema: TipoReclamoSchema}]),
  ],
  controllers: [TipoReclamoController],
  providers: [TipoReclamoService,
    {
      provide: 'ITipoReclamoRepository',
      useClass: TipoReclamoRepository,
    }
  ],
  exports: [TipoReclamoService],
})
export class TipoReclamoModule {}
