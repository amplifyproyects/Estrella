import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';



import { Usuario } from './usuarios/usuario.model';
import { Solicitud } from './solicitud/solicitud.model';

import { UsuariosModule } from './usuarios/usuarios.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioService } from './usuario/usuario.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),

        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),

        database: config.get<string>('DB_DATABASE'),

        autoLoadModels: true,

        synchronize: true,
      }),
    }),

    UsuariosModule,
    AuthModule,
    SolicitudModule,

    SequelizeModule.forFeature([
      Usuario,
      Solicitud,
    ]),
  ],
  providers: [UsuarioService],
})
export class AppModule {}
