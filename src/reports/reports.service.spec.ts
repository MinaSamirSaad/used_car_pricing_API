import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from '../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

describe('ReportsService', () => {
  let service: ReportsService;
  let reportRepository: Partial<Repository<Report>>;

  const mockUser: User = { id: 1, email: 'test@example.com', isAdmin: false } as User;

  beforeEach(async () => {
    reportRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: reportRepository,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  describe('createReport', () => {
    it('should create and save a new report', async () => {
      const createReportDto: CreateReportDto = { price: 25000, make: 'Toyota', model: 'Camry', year: 2020, mileage: 50000, lng: -118.2437, lat: 34.0522 };
      const mockReport = { id: 1, ...createReportDto, user: mockUser } as Report;

      (reportRepository.create as jest.Mock).mockReturnValue(mockReport);
      (reportRepository.save as jest.Mock).mockResolvedValue(mockReport);

      const result = await service.createReport(createReportDto, mockUser);

      expect(reportRepository.create).toHaveBeenCalledWith(createReportDto);
      expect(reportRepository.save).toHaveBeenCalledWith(mockReport);
      expect(result).toEqual(mockReport);
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      const mockReports = [{ "approved": undefined, "id": 1, "lat": undefined, "lng": undefined, "make": "Toyota", "mileage": undefined, "model": undefined, "price": 25000, "user": { "email": undefined, "id": undefined }, "year": undefined }] as Report[];
      (reportRepository.find as jest.Mock).mockResolvedValue(mockReports);
      const user = { id: 2, isAdmin: false } as User;
      const result = await service.findAll(user);

      expect(reportRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining(mockReports));
    });
  });

  describe('findById', () => {
    it('should return a specific report by ID', async () => {
      const mockReport = { id: 1, price: 25000, make: 'Toyota' } as Report;
      (reportRepository.findOne as jest.Mock).mockResolvedValue(mockReport);

      const result = await service.findById(1);

      expect(reportRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockReport);
    });

    it('should throw NotFoundException if report is not found', async () => {
      (reportRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateReport', () => {
    it('should update a specific report by ID', async () => {
      const mockReport = { id: 1, price: 25000, make: 'Toyota', user: mockUser } as Report;
      (reportRepository.findOne as jest.Mock).mockResolvedValue(mockReport);
      (reportRepository.save as jest.Mock).mockResolvedValue({ ...mockReport, price: 30000 });

      const result = await service.updateReport(1, { price: 30000 }, mockUser);

      expect(reportRepository.save).toHaveBeenCalledWith(expect.objectContaining({ price: 30000 }));
      expect(result).toEqual(expect.objectContaining({ price: 30000 }));
    });

    it('should throw UnauthorizedException if user is not the owner', async () => {
      const anotherUser = { id: 2 } as User;
      const mockReport = { id: 1, price: 25000, make: 'Toyota', user: mockUser } as Report;
      (reportRepository.findOne as jest.Mock).mockResolvedValue(mockReport);

      await expect(service.updateReport(1, { price: 30000 }, anotherUser)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('deleteReport', () => {
    it('should delete a report by ID if the user is the owner', async () => {
      const mockReport = { id: 1, price: 25000, make: 'Toyota', user: mockUser } as Report;
      (reportRepository.findOne as jest.Mock).mockResolvedValue(mockReport);
      (reportRepository.remove as jest.Mock).mockResolvedValue(mockReport);

      const result = await service.deleteReport(1, mockUser);

      expect(reportRepository.remove).toHaveBeenCalledWith(mockReport);
      expect(result).toEqual(mockReport);
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      const anotherUser = { id: 2, isAdmin: false } as User;
      const mockReport = { id: 1, user: mockUser } as Report;
      (reportRepository.findOne as jest.Mock).mockResolvedValue(mockReport);

      await expect(service.deleteReport(1, anotherUser)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('approveReport', () => {
    it('should approve a specific report', async () => {
      const mockReport = { id: 1, price: 25000, make: 'Toyota', approved: false } as Report;
      const approveReportDto: ApproveReportDto = { approved: true };

      (reportRepository.findOne as jest.Mock).mockResolvedValue(mockReport);
      (reportRepository.save as jest.Mock).mockResolvedValue({ ...mockReport, approved: true });

      const result = await service.approveReport(1, approveReportDto, mockUser);

      expect(reportRepository.save).toHaveBeenCalledWith(expect.objectContaining({ approved: true }));
      expect(result).toEqual(expect.objectContaining({ approved: true }));
    });
  });

  describe('createEstimate', () => {
    it('should return an estimated price based on query', async () => {
      const estimateDto: GetEstimateDto = { make: 'Toyota', model: 'Camry', year: 2020, mileage: 50000, lng: -118.2437, lat: 34.0522 };
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        setParameters: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ price: 25000 }),
      };
      (reportRepository.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);

      const result = await service.createEstimate(estimateDto);

      expect(mockQueryBuilder.getRawOne).toHaveBeenCalled();
      expect(result).toEqual({ price: 25000 });
    });
  });
});
