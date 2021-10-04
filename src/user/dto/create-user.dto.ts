import { IsNotEmpty, min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true})
    @IsNotEmpty()
    fullname : string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    email : string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    password : string;

    @ApiProperty({ required: true})
    acceptedTerms : boolean;

}

export class UserLoginDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    email : string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    password : string;
  
}
