import {
    IsNumber,
    IsString,
    IsLatitude,
    IsLongitude,
    Max,
    Min,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class GetEstimateDto {
    @IsString()
    @IsOptional()
    make: string;

    @IsString()
    @IsOptional()
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

    @Transform(({ value }) => +value)
    @IsLongitude()
    @IsOptional()
    lng: number;

    @Transform(({ value }) => +value)
    @IsLatitude()
    @IsOptional()
    lat: number;
}