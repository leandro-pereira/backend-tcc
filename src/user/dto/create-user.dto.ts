import { IsNotEmpty, min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true})
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    password: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    idIstagram: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    tel: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    isBusiness: boolean;

    @ApiProperty({ required: false})
    description: string;

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
