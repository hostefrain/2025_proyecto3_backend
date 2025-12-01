import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ClienteModule } from './cliente/cliente.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TipoProyectoModule } from './tipo_proyecto/tipo_proyecto.module';
import { EstadoModule } from './estado/estado.module';
import { ReclamoModule } from './reclamo/reclamo.module';
import { TipoReclamoModule } from './tipo_reclamo/tipo_reclamo.module';
import { PrioridadModule } from './prioridad/prioridad.module';
import { NivelCriticidadModule } from './nivel_criticidad/nivel_criticidad.module';
import { AccionModule } from './accion/accion.module';
import { AreaModule } from './area/area.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    // 👇 Cargar variables .env globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 👇 Conexión a Mongo usando variable de entorno VALIDADA
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');

        if (!uri) {
          throw new Error('La variable de entorno MONGODB_URI no está definida');
        }

        return {
          uri,
        };
      },
    }),

    ClienteModule,
    ProyectoModule,
    TipoProyectoModule,
    EstadoModule,
    ReclamoModule,
    TipoReclamoModule,
    PrioridadModule,
    NivelCriticidadModule,
    AccionModule,
    AreaModule,
    UsuarioModule,
    RolModule,
  ],
})
export class AppModule {}
