import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsString,
    IsLatitude,
    IsLongitude,
    Max,
    Min,
    IsOptional,
} from 'class-validator';
export class UpdateReportDto {
    @IsNumber()
    @ApiProperty({
        description: 'The price of the car',
        example: 25000,
        minimum: 0,
        maximum: 1000000,
        required: false,
    })
    @Min(0)
    @Max(1000000)
    @IsOptional()
    price: number;

    @IsString()
    @ApiProperty({
        description: 'The make of the car',
        example: 'toyota',
        required: false,
    })
    @IsOptional()
    make: string;

    @IsString()
    @ApiProperty({
        description: 'The model of the car',
        example: 'camry',
        required: false,
    })
    @IsOptional()
    model: string;

    @IsNumber()
    @ApiProperty({
        description: 'The year of the car',
        example: 2020,
        minimum: 1950,
        maximum: new Date().getFullYear(),
        required: false,
    })
    @IsOptional()
    @Min(1950)
    @Max(new Date().getFullYear())
    year: number;

    @IsNumber()
    @ApiProperty({
        description: 'The mileage of the car',
        example: 50000,
        minimum: 0,
        maximum: 1000000,
        required: false,
    })
    @IsOptional()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    @ApiProperty({
        description: 'The longitude of the car',
        example: -118.2437,
        required: false,
    })
    @IsOptional()
    lng: number;

    @IsLatitude()
    @ApiProperty({
        description: 'The latitude of the car',
        example: 34.0522,
        required: false,
    })
    @IsOptional()
    lat: number;

}