import { Expose, Transform } from "class-transformer";
export class ReportUserDto {
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
    @Transform(({ obj }) => obj.reviews?.map(review => ({ id: review.id, content: review.content, rating: review.rating })))
    reviews: { id: number, content: string, rating: number }[];
}