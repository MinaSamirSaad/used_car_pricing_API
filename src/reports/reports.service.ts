import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) { }

    async createReport(newReport: CreateReportDto) {
        const report = this.reportRepository.create(newReport);
        return await this.reportRepository.save(report);
    }
    async findAll(): Promise<Report[]> {
        return await this.reportRepository.find();
    }
    async findById(id: number): Promise<Report | undefined> {
        return await this.reportRepository.findOne({ where: { id: id } });
    }
    async updateReport(id: number, updatedReport: Partial<Report>): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new Error('report not found');
        }
        Object.assign(report, updatedReport);
        return await this.reportRepository.save(report);
    }
    async deleteReport(id: number): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new Error('report not found');
        }
        return await this.reportRepository.remove(report);
    }

}
