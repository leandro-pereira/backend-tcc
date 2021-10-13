import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, Query, UploadedFile, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from './dto/create-user.dto';
import { UserPasswordUpdateDto, UserPhotoUrlUpdateDto } from './dto/update-user.dto';
import { HttpResponseDto } from 'src/config/http-response.dto';
import { ApiResponse, ApiParam, ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { ErrorHandling } from 'src/config/error-handling';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

// import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService : AuthService,
    private readonly userService: UserService
  ) {}

  @ApiTags('user')
  @ApiResponse({ status: 200, description: 'Successfully registered', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags('user')
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('user')
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiTags('user')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: memoryStorage(),
  }))
  @Post('/update-photo')
  updatePhoto(@Body() { user }, @UploadedFile() image) {
    let userData = JSON.parse(user);

    return this.userService.updateImageProfile(userData, image);
  }

  @ApiTags('user')
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Patch('/update-password')
  updatePassword(@Body() updateUser: UserPasswordUpdateDto) {
    return this.userService.updatePassword(updateUser);
  }

  @ApiTags('user')
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiTags('user')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: 200, description: 'Successfully logged in ', type: UserLoginDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto })
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Post('/login')
  @HttpCode
  (200)
  async login(@Body() loginData : UserLoginDto) {
      try {
        console.log('chegou');
        
          if (!loginData) {
              throw new HttpException({ status: 400, error: "Invalid Body" }, 400);
          }

          return this.authService.validateUser(loginData.email, loginData.password);

      } catch (error) {
          new ErrorHandling(error);
      }
  }

}
