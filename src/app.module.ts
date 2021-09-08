import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
