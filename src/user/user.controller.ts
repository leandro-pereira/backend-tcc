import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpResponseDto } from 'src/config/http-response.dto';
import { ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
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
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
  @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
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
}
