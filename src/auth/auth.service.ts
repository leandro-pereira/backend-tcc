import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { jwtConstants } from './constants';
import * as util from 'util'

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException({ status: 403, error: "User Not Authorized" }, 403);
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      throw new HttpException({ status: 403, error: "User Not Authorized" }, 403);
    }

    return await this.authenticatedUser(user);
    
  }

  async authenticatedUser(user: any) {

    const token = await this.generateToken(user);

    delete user.password;

    return Object.assign(user, {
      token : token
    });

  }

  async generateToken(user: User) {

    const payload: any = {
      id: user.id,
      fullname : user.fullname,
      email : user.email,
    };

    return this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
    });
  }

  // async recoverPassword(email: string, language : string) {
  //   const user = await this.usersService.getUserByEmail(email);

  //   if(!user) {
  //     throw new HttpException(
  //       {
  //         status: 404,
  //         error: "User not found",
  //       },
  //       400
  //     );
  //   }

  //   const token = await this.generateRecoverPasswordToken(user);

  //   await this.emailsService.sendRecoverPasswordEmail(
  //     user.email,
  //     language,
  //     {
  //       url_recover_password: util.format(process.env.SITE_URL + '/auth/login?resetPasswordToken=%s', token)
  //     }
  //   );
  //     // Delete unused data


  // }

  async generateRecoverPasswordToken(user) {

    const payload: any = {
      id : user.id,
      email : user.email,
      fullname : user.fullname
    };

    return this.jwtService.sign(payload, {
      secret: jwtConstants.resetPasswordSecret,
      expiresIn: '1h'
    });

  }

}
