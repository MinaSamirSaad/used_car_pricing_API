import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { User } from '../users/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: Partial<ReportsService>;

  beforeEach(async () => {
    service = {
      createReport: jest.fn(),
      findAll: jest.fn(),
      createEstimate: jest.fn(),
      findById: jest.fn(),
      updateReport: jest.fn(),
      approveReport: jest.fn(),
      deleteReport: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [{ provide: ReportsService, useValue: service }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })  // Mock AuthGuard
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })  // Mock AdminGuard
      .compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  describe('createReport', () => {
    it('should create a new report', async () => {
      const createReportDto = new CreateReportDto();
      const user = { id: 1, email: 'test@test.com' } as User;
      const result = { id: 1, ...createReportDto, user };

      (service.createReport as jest.Mock).mockResolvedValue(result);

      expect(await controller.createReport(createReportDto, user)).toEqual(result);
      expect(service.createReport).toHaveBeenCalledWith(createReportDto, user);
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const result = [{ id: 1, make: 'Toyota', model: 'Camry' }];
      (service.findAll as jest.Mock).mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('createEstimate', () => {
    it('should return an estimate', async () => {
      const query = new GetEstimateDto();
      const result = { price: 25000 };

      (service.createEstimate as jest.Mock).mockResolvedValue(result);

      expect(await controller.createEstimate(query)).toEqual(result);
      expect(service.createEstimate).toHaveBeenCalledWith(query);
    });
  });

  describe('findById', () => {
    it('should return a report by ID', async () => {
      const reportId = 1;
      const result = { id: reportId, make: 'Toyota' };

      (service.findById as jest.Mock).mockResolvedValue(result);

      expect(await controller.findById(reportId)).toEqual(result);
      expect(service.findById).toHaveBeenCalledWith(reportId);
    });

  });

  describe('updateReport', () => {
    it('should update a report', async () => {
      const reportId = 1;
      const updateReportDto = new UpdateReportDto();
      const user = { id: 1, email: 'test@test.com' } as User;
      const result = { id: reportId, ...updateReportDto };

      (service.updateReport as jest.Mock).mockResolvedValue(result);

      expect(await controller.updateReport(reportId, updateReportDto, user)).toEqual(result);
      expect(service.updateReport).toHaveBeenCalledWith(reportId, updateReportDto, user);
    });
  });

  describe('approveReport', () => {
    it('should approve a report', async () => {
      const reportId = 1;
      const approveReportDto = new ApproveReportDto();
      const user = { id: 1, email: 'admin@test.com' } as User;
      const result = { id: reportId, approved: true };

      (service.approveReport as jest.Mock).mockResolvedValue(result);

      expect(await controller.approveReport(reportId, approveReportDto, user)).toEqual(result);
      expect(service.approveReport).toHaveBeenCalledWith(reportId, approveReportDto, user);
    });
  });

  describe('deleteReport', () => {
    it('should delete a report', async () => {
      const reportId = 1;
      const user = { id: 1, email: 'test@test.com' } as User;
      const result = { id: reportId };

      (service.deleteReport as jest.Mock).mockResolvedValue(result);

      expect(await controller.deleteReport(reportId, user)).toEqual(result);
      expect(service.deleteReport).toHaveBeenCalledWith(reportId, user);
    });

  });
});
