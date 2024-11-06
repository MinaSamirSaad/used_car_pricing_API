import { Expose, Transform } from "class-transformer";
export class ReportDto {
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    year: number;
    @Expose()
    mileage: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Transform(({ obj }) => ({ id: obj.user?.id, email: obj.user?.email }))
    @Expose()
    user: { id: number, email: string };
    @Expose()
    approved: boolean;
}