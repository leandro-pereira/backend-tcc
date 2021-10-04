import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { UserModule } from './user/user.module';
import { PublicationModule } from './publication/publication.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    PublicationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
