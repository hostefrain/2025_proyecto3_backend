import { Module } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { ReclamoController } from './reclamo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamo, ReclamoSchema } from './schemas/reclamo.schema';
import { ReclamoRepository } from './reclamo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reclamo.name, schema: ReclamoSchema }]),
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
