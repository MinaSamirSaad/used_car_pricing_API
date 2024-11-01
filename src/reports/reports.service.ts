import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) { }

    async createReport(newReport: CreateReportDto, user: User) {
        const report = this.reportRepository.create(newReport);
        report.user = user;
        return await this.reportRepository.save(report);
    }
    async findAll(): Promise<Report[]> {
        return await this.reportRepository.find();
    }
    async findById(id: number): Promise<Report | undefined> {
        return await this.reportRepository.findOne({ where: { id: id } });
    }
    async updateReport(id: number, updatedReport: Partial<Report>, user: User): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new Error('report not found');
        }
        if (report.user.id !== user.id) {
            throw new UnauthorizedException('Unauthorized access');
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

    async approveReport(id: number, data: ApproveReportDto, user: User) {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new Error('report not found');
        }
        if (report.user.id === user.id) {
            throw new UnauthorizedException('Unauthorized access');
        }
        report.approved = data.approved;
        return await this.reportRepository.save(report);
    }

}
