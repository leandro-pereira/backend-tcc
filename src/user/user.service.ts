import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPasswordUpdateDto, UserPhotoUrlUpdateDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UserRepository } from './user.repository';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class UserService {

  constructor(
    private readonly filesUploadService : FileUploadService,
    private readonly userRepository: UserRepository
  ){}

  async create(createUserDto: CreateUserDto) {

    if (!createUserDto.acceptedTerms) {
      throw new HttpException("You must accept the terms to register", 401);
    }
    
    createUserDto.password = bcryptjs.hashSync(createUserDto.password, bcryptjs.genSaltSync(10));

    let checkEmail = await this.getUserByEmail(createUserDto.email);

    if (checkEmail != null) {
      throw new HttpException("EMAIL_ALREADY_EXISTS", 401);
    }

    let user = await this.userRepository.createUser(createUserDto);

    delete user.password;

    return user;
  }

  async findAll() {
    let oi = await this.userRepository.findAllUser();
    console.log(oi,' pegou algo?');
    return oi;
  }

  async getUserByEmail(email : string) {
    return await this.userRepository.getUserByEmail(email);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  async updateImageProfile(updateUserDto: UserPhotoUrlUpdateDto, image) {
    
    if (image != null) {
      let fileUrl = await this.filesUploadService.uploadFileToS3(image.buffer, image.originalname, updateUserDto.id);
      updateUserDto.photoUrl = fileUrl;
    }
    
    return await this.userRepository.updateImageProfile(updateUserDto);
  }

  async updatePassword(updateUserDto: UserPasswordUpdateDto) {
    return await this.userRepository.updatePassword(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
