import { ReportsService } from './reports.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateReportDto } from './dtos/update-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
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
    findAll() {
        return this.reportsService.findAll();
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
    @Serialize(ReportDto)
    findById(@Param('id') id: number) {
        return this.reportsService.findById(id);
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
}
