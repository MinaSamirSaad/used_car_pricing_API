import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class ApproveReportDto {
    @ApiProperty({
        description: 'Approve or reject the report',
        example: true,
        required: true,
    })
    @IsBoolean()
    approved: boolean;
}