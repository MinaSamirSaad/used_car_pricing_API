import { ReportsService } from './reports.service';
import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateReportDto } from './dtos/update-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Serialize(ReportDto)
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(body, user);
    }
    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.reportsService.findAll();
    }
    @Get('/:id')
    @UseGuards(AuthGuard)
    findById(@Param('id') id: number) {
        return this.reportsService.findById(id);
    }
    @Patch('/:id')
    @UseGuards(AuthGuard)
    updateReport(@Param('id') id: number, @Body() body: UpdateReportDto, @CurrentUser() user: User) {
        return this.reportsService.updateReport(id, body, user);
    }

    @Patch('/:id/approve')
    @UseGuards(AuthGuard)
    approveReport(@Param('id') id: number, @Body() body: ApproveReportDto, @CurrentUser() user: User) {
        return this.reportsService.approveReport(id, body, user);
    }
}
