import { ReportsService } from './reports.service';
import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateReportDto } from './dtos/update-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.createReport(body);
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
    updateReport(@Param('id') id: number, @Body() body: UpdateReportDto) {
        return this.reportsService.updateReport(id, body);
    }
}
