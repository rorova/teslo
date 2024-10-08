import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ 
    ConfigModule.forRoot(), //configuracion de variables de entorno

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, // Para que cargue automatico las entidades
      synchronize: true, // Hace que cualquier cambio que realice en mi archivo de configuracion de la base o sus tablas, la sincronice automaticamente en la BD, no se recomienda en prod ( en prod se hace migracion)

    }), 

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), // Indico que directorio voy a dejar de manera estatica para que se vea publico
    }),

    ProductsModule, 
    CommonModule, 
    SeedModule, 
    FilesModule,// Creo configuracion para typeorm y su conexion
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
