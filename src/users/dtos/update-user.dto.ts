import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    @ApiProperty({
        example: 'test123@test.com',
        required: false
    })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'secret',
        required: false
    })
    password: string;
}
