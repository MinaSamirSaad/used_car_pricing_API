import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @IsEmail()
    @ApiProperty({
        example: 'test@test.com',
        required: true
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: '1234578910',
        required: true
    })
    password: string;
}