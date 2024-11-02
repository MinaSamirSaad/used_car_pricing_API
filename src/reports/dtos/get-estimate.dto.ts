import {
    IsNumber,
    IsString,
    IsLatitude,
    IsLongitude,
    Max,
    Min,
    IsOptional,
    IsLowercase,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class GetEstimateDto {
    @IsString()
    @ApiProperty({
        description: 'The make of the car',
        example: 'toyota',
        required: false,
    })
    @Transform(({ value }) => value.toLowerCase())
    @IsOptional()
    make: string;

    @IsString()
    @ApiProperty({
        description: 'The model of the car',
        example: 'camry',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    model: string;

    @Transform(({ value }) => +value)
    @IsNumber()
    @ApiProperty({
        description: 'The year of the car',
        example: 2020,
        minimum: 1950,
        maximum: new Date().getFullYear(),
        required: false,
    })
    @Min(1950)
    @Max(new Date().getFullYear())
    @IsOptional()
    year: number;

    @Transform(({ value }) => +value)
    @IsNumber()
    @ApiProperty({
        description: 'The mileage of the car',
        example: 50000,
        minimum: 0,
        maximum: 1000000,
        required: false,
    })
    @Min(0)
    @Max(1000000)
    @IsOptional()
    mileage: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    @ApiProperty({
        description: 'The longitude of the car',
        example: -118.2437,
        required: false,
    })
    @IsOptional()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    @ApiProperty({
        description: 'The latitude of the car',
        example: 34.0522,
        required: false,
    })
    @IsOptional()
    lat: number;
}