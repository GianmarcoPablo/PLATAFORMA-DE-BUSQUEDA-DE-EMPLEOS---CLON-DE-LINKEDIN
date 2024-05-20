import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { ScheduleModule } from '@nestjs/schedule';
import { ProfileModule } from './profile/profile.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // para cargar las variables de entorno
    // ScheduleModule.forRoot(), // para programar tareas
    AuthModule, ProfileModule, CurriculumModule, CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
