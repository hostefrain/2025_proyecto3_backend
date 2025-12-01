import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from './schema/rol.schema';
import { RolRepository } from './rol.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }]),
  ],
  controllers: [RolController],
  providers: [RolService,
    {
      provide: 'IRolRepository',
      useClass: RolRepository,
    }
  ],
  exports: [RolService],
})
export class RolModule {}
