import { Transform } from 'class-transformer';
import {
    IsNumber,
    IsString,
    IsLatitude,
    IsLongitude,
    Max,
    Min,
    IsLowercase,
} from 'class-validator';
export class CreateReportDto {
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    make: string;

    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    model: string;

    @IsNumber()
    @Min(1950)
    @Max(new Date().getFullYear())
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;
}