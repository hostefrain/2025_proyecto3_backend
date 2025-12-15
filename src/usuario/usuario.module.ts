import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './schema/usuario.schema';
import { UsuarioRepository } from './usuario.repository';
import { AreaModule } from 'src/area/area.module';
import { RolModule } from 'src/rol/rol.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema}]),
    AreaModule,
    RolModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService,
    {
      provide: 'IUsuarioRepository',
      useClass: UsuarioRepository,
    }
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
