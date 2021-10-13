import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
    FileUploadService
  ],
  controllers: [UserController],
  providers: [UserService, FileUploadService],
  exports: [UserService]
})
export class UserModule {}
