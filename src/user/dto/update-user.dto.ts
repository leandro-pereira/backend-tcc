import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserPhotoUrlUpdateDto {

    @ApiProperty({ required: true})
    @IsNotEmpty()
    id: string;

    @ApiProperty({ required: false})
    @IsNotEmpty()
    photoUrl: any;

}

export class UserPasswordUpdateDto {

    @ApiProperty({ required: true})
    @IsNotEmpty()
    id: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    password: string;

    @ApiProperty({ required: true})
    @IsNotEmpty()
    newPassword: string;
}