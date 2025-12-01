import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteSchema } from './schemas/cliente.schema';
import { ClienteRepository } from './cliente.repository';

@Module({

  imports: [
    MongooseModule.forFeature([{name: 'Cliente', schema: ClienteSchema }]),
  ],

  controllers: [ClienteController],
  providers: [
    ClienteService,
    {
      provide: 'IClienteRepository',
      useClass: ClienteRepository,
    },
  ],
  exports: [ClienteService],
})

export class ClienteModule {}
