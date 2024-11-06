import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) { }

    async createReport(newReport: CreateReportDto, user: User) {
        console.log('user', user);
        const report = this.reportRepository.create(newReport);
        report.user = user;
        return await this.reportRepository.save(report);
    }
    async findAll(): Promise<ReportDto[]> {
        const reports = await this.reportRepository.find();
        return reports.map(report => {
            return plainToClass(ReportDto, report, { excludeExtraneousValues: true })
        });
    }
    async findById(id: number): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('report not found');
        }
        return report;
    }
    async updateReport(id: number, updatedReport: Partial<Report>, user: User): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('report not found');
        }
        if (report.user.id !== user.id) {
            throw new UnauthorizedException('Unauthorized access');
        }
        Object.assign(report, updatedReport);
        return await this.reportRepository.save(report);
    }
    async deleteReport(id: number, user: User): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('report not found');
        }
        if (report.user.id === user.id || user.isAdmin) {
            return await this.reportRepository.remove(report);
        }
        throw new UnauthorizedException('Unauthorized access');
    }

    async approveReport(id: number, data: ApproveReportDto, user: User) {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('report not found');
        }

        report.approved = data.approved;
        return await this.reportRepository.save(report);
    }

    async createEstimate(query: GetEstimateDto) {
        return await this.reportRepository.createQueryBuilder()
            .select('AVG(price)', 'price')
            .andWhere('make = :make', { make: query.make })
            .andWhere('model = :model', { model: query.model })
            .andWhere('year = :year', { year: query.year })
            .andWhere('mileage <= :mileage', { mileage: query.mileage })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage: query.mileage })
            .limit(3)
            .getRawOne();
    }

}
