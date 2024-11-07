import { ReportsService } from './reports.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateReportDto } from './dtos/update-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report-admin.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewsService } from '../reviews/reviews.service';
import { ReviewDto } from '../reviews/dtos/review.dto';
import { CreateReviewDto } from '../reviews/dtos/create-review.dto';


@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService, private reviewsService: ReviewsService) { }
    @ApiOperation({ summary: 'Create a new report' })
    @ApiResponse({
        status: 201,
        description: 'The report has been successfully created',
        type: ReportDto,
        examples: {
            success: {
                value: {
                    "id": 1,
                    "price": 25000,
                    "make": "toyota",
                    "model": "camry",
                    "year": 2020,
                    "mileage": 50000,
                    "lng": -118.2437,
                    "lat": 34.0522,
                    "user": {
                        "id": 1,
                        "email": "test@example.com"
                    },
                    "approved": false
                },
                summary: 'The report has been successfully created',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        examples: {
            unauthorized: {
                value: {
                    message: 'Unauthorized access',
                    error: 'Unauthorized',
                },
                summary: 'Unauthorized access',
            },
        },
    })
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(body, user);
    }

    // -----------------------------------------------------
    @ApiOperation({ summary: 'Get all reports' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved reports',
        type: [ReportDto],
        examples: {
            success: {
                value: [
                    {
                        "id": 1,
                        "price": 25000,
                        "make": "toyota",
                        "model": "camry",
                        "year": 2020,
                        "mileage": 50000,
                        "lng": -118.2437,
                        "lat": 34.0522,
                        "user": {
                            "id": 1,
                            "email": "test@example.com"
                        },
                    }],
                summary: 'Successfully retrieved reports',
            },
        },
    })
    @Get()
    findAll(@CurrentUser() user?: User) {
        return this.reportsService.findAll(user);
    }

    // -----------------------------------------------------
    @ApiOperation({ summary: 'create estimate' })
    @ApiResponse({
        status: 200,
        description: 'Successfully created estimate',
        type: ReportDto,
        examples: {
            success: {
                value: {
                    "price": 25000
                },
                summary: 'Successfully created estimate',
            },
        },
    })
    @Get('estimate')
    createEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }

    // -----------------------------------------------------
    @ApiOperation({ summary: 'Get a specific report by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved report',
        type: ReportDto,
        examples: {
            success: {
                value: {
                    "id": 1,
                    "price": 25000,
                    "make": "toyota",
                    "model": "camry",
                    "year": 2020,
                    "mileage": 50000,
                    "lng": -118.2437,
                    "lat": 34.0522,
                    "user": {
                        "id": 1,
                        "email": "test@example.com"
                    },
                },
                summary: 'Successfully retrieved report',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Report not found',
        examples: {
            notFound: {
                value: {
                    message: 'Report not found',
                    error: "Not Found",
                },
                summary: 'Report not found',
            },
        },
    })
    @Get('/:id')
    findById(@Param('id') id: number, @CurrentUser() user?: User) {
        return this.reportsService.findById(id, user);
    }

    // -----------------------------------------------------
    @ApiOperation({ summary: 'Approve a specific report by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully approved report',
        type: ReportDto,
        examples: {
            success: {
                value: {
                    "id": 1,
                    "price": 25000,
                    "make": "toyota",
                    "model": "camry",
                    "year": 2020,
                    "mileage": 50000,
                    "lng": -118.2437,
                    "lat": 34.0522,
                    "user": {
                        "id": 1,
                        "email": "test@test.com",
                    },
                    "approved": true,
                },
                summary: 'Successfully approved report',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        examples: {
            unauthorized: {
                value: {
                    message: 'Unauthorized access',
                    error: 'Unauthorized',
                },
                summary: 'Unauthorized access',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Report not found',
        examples: {
            notFound: {
                value: {
                    message: 'Report not found',
                    error: "Not Found",
                },
                summary: 'Report not found',
            },
        },
    })
    @Patch('/:id/approve')
    @UseGuards(AdminGuard)
    @Serialize(ReportDto)
    approveReport(@Param('id') id: number, @Body() body: ApproveReportDto, @CurrentUser() user: User) {
        return this.reportsService.approveReport(id, body, user);
    }
    // -----------------------------------------------------
    @ApiOperation({ summary: 'Update a specific report by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated report',
        type: ReportDto,
        examples: {
            success: {
                value: {
                    "id": 1,
                    "price": 25000,
                    "make": "toyota",
                    "model": "camry",
                    "year": 2020,
                    "mileage": 50000,
                    "lng": -118.2437,
                    "lat": 34.0522,
                    "user": {
                        "id": 1,
                        "email": "test@example.com"
                    },
                    "approved": false
                },
                summary: 'Successfully updated report',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        examples: {
            unauthorized: {
                value: {
                    message: 'Unauthorized access',
                    error: 'Unauthorized',
                },
                summary: 'Unauthorized access',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Report not found',
        examples: {
            notFound: {
                value: {
                    message: 'Report not found',
                    error: "Not Found",
                },
                summary: 'Report not found',
            },
        },
    })
    @Patch('/:id')
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    updateReport(@Param('id') id: number, @Body() body: UpdateReportDto, @CurrentUser() user: User) {
        return this.reportsService.updateReport(id, body, user);
    }
    // -----------------------------------------------------
    @ApiOperation({ summary: 'Delete a specific report by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully deleted report',
        type: ReportDto,
        examples: {
            success: {
                value: {
                    "price": 25000,
                    "make": "toyota",
                    "model": "camry",
                    "year": 2020,
                    "mileage": 50000,
                    "lng": -118.2437,
                    "lat": 34.0522,
                    "user": {
                        "id": 1,
                        "email": "test@example.com"
                    },
                    "approved": false
                },
                summary: 'Successfully deleted report',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        examples: {
            unauthorized: {
                value: {
                    message: 'Unauthorized access',
                    error: 'Unauthorized',
                },
                summary: 'Unauthorized access',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Report not found',
        examples: {
            notFound: {
                value: {
                    message: 'Report not found',
                    error: "Not Found",
                },
                summary: 'Report not found',
            },
        },
    })

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    deleteReport(@Param('id') id: number, @CurrentUser() user: User) {
        return this.reportsService.deleteReport(id, user);
    }

    // -----------------------------------------------------

    @ApiOperation({ summary: 'Get all reviews for a specific report' })
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched reviews for report',
        examples: {
            success: {
                value: [
                    {
                        "id": 1,
                        "rating": 4,
                        "content": "Great car!",
                        "user": {
                            "id": 1,
                            "email": "test@example.com"
                        },
                        "report": {
                            "id": 1,
                        }
                    },],
                summary: 'Successfully fetched reviews for report',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Report not found',
        examples: {
            notFound: {
                value: {
                    message: 'Report not found',
                    error: "Not Found",
                },
                summary: 'Report not found',
            },
        },
    })
    @Get('/:id/reviews')
    @Serialize(ReviewDto)
    async getReviews(@Param('id') id: number) {
        const report = await this.reportsService.findById(id)
        if (!report) {
            throw new NotFoundException('report not found');
        }
        return this.reviewsService.getReviewsForReport(id);
    }

    // -----------------------------------------------------

    @ApiOperation({ summary: 'Create a review for a specific report' })
    @ApiResponse({
        status: 201,
        description: 'Successfully created review for report',
        type: ReviewDto,
        examples: {
            success: {
                value: {
                    "id": 1,
                    "rating": 4,
                    "content": "Great car!",
                    "user": {
                        "id": 1,
                        "email": "test@example.com"
                    },
                    "report": {
                        "id": 1,
                    },
                },
                summary: 'Successfully created review for report',
            },
        },
    })
    @UseGuards(AuthGuard)
    @Serialize(ReviewDto)
    @Post('/:id/reviews')
    async createReview(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: User, @Param('id') reportId: number) {
        const report = await this.reportsService.findById(reportId);
        if (!report) {
            throw new NotFoundException('report not found');
        }
        return this.reviewsService.createReview(createReviewDto, user, report);
    }

    // -----------------------------------------------------
    @ApiOperation({ summary: 'Delete review for specific report' })
    @ApiResponse({
        status: 204,
        description: 'Successfully deleted review for report',
        examples: {
            success: {
                value: '',
                summary: 'Successfully deleted review for report',
            },
        },
    })
    @Delete('/:reportId/reviews/:reviewId')
    @UseGuards(AuthGuard)
    async deleteReview(@Param('reportId') reportId: number, @Param('reviewId') reviewId: number, @CurrentUser() user: User) {
        const report = await this.reportsService.findById(reportId);
        if (!report) {
            throw new NotFoundException('report not found');
        }
        await this.reviewsService.deleteReview(reviewId, user);
        return null;
    }
    // -----------------------------------------------------
}
