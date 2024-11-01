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
    @Min(0)
    @Max(1000000)
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    make: string;

    @IsString()
    @IsOptional()
    model: string;

    @IsNumber()
    @IsOptional()
    @Min(1950)
    @Max(new Date().getFullYear())
    year: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    @IsOptional()
    lng: number;

    @IsLatitude()
    @IsOptional()
    lat: number;

}