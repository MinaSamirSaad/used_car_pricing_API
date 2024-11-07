import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    @ApiProperty(
        {
            description: 'The content of the review',
            example: 'This is a great car'
        }
    )
    content: string;

    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty(
        {
            description: 'The rating of the review',
            example: 5,
            minimum: 1,
            maximum: 5
        }
    )
    rating: number;
}
