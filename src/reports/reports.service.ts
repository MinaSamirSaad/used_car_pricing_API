import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { ReportUserDto } from './dtos/report-user.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report-admin.dto';
import { plainToClass } from 'class-transformer';
import { ReviewsService } from '@src/reviews/reviews.service';

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
    async findAll(user?: User): Promise<ReportUserDto[] | ReportDto[]> {
        const reports = await this.reportRepository.find();
        if (user && user?.isAdmin) {
            return reports.map(report => {
                return plainToClass(ReportDto, report, { excludeExtraneousValues: true })
            });
        }
        return reports.filter(report => {
            return report.approved;
        }).map(report => {
            return plainToClass(ReportUserDto, report, { excludeExtraneousValues: true })
        });
    }
    async findById(id: number, user?: User): Promise<Report | ReportUserDto> {
        const report = await this.reportRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('report not found');
        }
        if (user && (user?.isAdmin || report.user?.id == user.id)) {
            return plainToClass(ReportDto, report, { excludeExtraneousValues: true });
        }
        if (!report.approved) {
            throw new NotFoundException('report not found');
        }
        return plainToClass(ReportUserDto, report, { excludeExtraneousValues: true });
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
        if (!user.isAdmin) {
            throw new UnauthorizedException('Unauthorized access');
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
