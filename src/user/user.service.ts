import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(
private readonly userRepository: UserRepository
  ){}

  async create(createUserDto: CreateUserDto) {
    console.log('bateu com isso aqui', createUserDto);
    let oi = await this.userRepository.createUser(createUserDto);
    console.log('opa sera', oi);
    
    return oi;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
