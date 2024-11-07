import { Expose, Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class ReviewDto {
    @Expose()
    id: number;
    @Expose()
    content: string;
    @Expose()
    rating: number;
    @Transform(({ obj }) => ({ id: obj.user?.id, email: obj.user?.email }))
    @Expose()
    @IsOptional()
    user: { id: number, email: string };
    @Transform(({ obj }) => ({ id: obj.report?.id }))
    @IsOptional()
    @Expose()
    report: { id: number };
}
