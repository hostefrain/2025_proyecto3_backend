import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './schemas/area.schema';
import { AreaRepository } from './area.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
  ],
  controllers: [AreaController],
  providers: [
    AreaService,
    {
      provide: 'IAreaRepository',
      useClass: AreaRepository,
    },
  ],
  exports: [AreaService],
})
export class AreaModule {}
