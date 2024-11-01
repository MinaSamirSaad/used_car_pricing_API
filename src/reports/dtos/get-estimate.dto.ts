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
export class GetEstimateDto {
    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    @IsOptional()
    make: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    model: string;

    @Transform(({ value }) => +value)
    @IsNumber()
    @Min(1950)
    @Max(new Date().getFullYear())
    @IsOptional()
    year: number;

    @Transform(({ value }) => +value)
    @IsNumber()
    @Min(0)
    @Max(1000000)
    @IsOptional()
    mileage: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    @IsOptional()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    @IsOptional()
    lat: number;
}