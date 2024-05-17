import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(), // para cargar las variables de entorno
    // ScheduleModule.forRoot(), // para programar tareas
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
