import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { CreateReviewDto } from '../reviews/dtos/create-review.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { User } from '../users/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reportsService: ReportsService;
  let reviewsService: ReviewsService;

  const mockReportsService = {
    createReport: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateReport: jest.fn(),
    deleteReport: jest.fn(),
    approveReport: jest.fn(),
    createEstimate: jest.fn(),
  };

  const mockReviewsService = {
    getReviewsForReport: jest.fn(),
    createReview: jest.fn(),
    deleteReview: jest.fn(),
  };

  const mockUser = { id: 1, email: 'test@example.com' } as User;
  const mockReportId = 1;
  const mockReviewId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        { provide: ReportsService, useValue: mockReportsService },
        { provide: ReviewsService, useValue: mockReviewsService },
      ],
    }).overrideGuard(AuthGuard).useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(AdminGuard).useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ReportsController>(ReportsController);
    reportsService = module.get<ReportsService>(ReportsService);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReport', () => {
    it('should create a new report', async () => {
      const createReportDto: CreateReportDto = {
        price: 20000,
        make: 'Toyota',
        model: 'Camry',
        year: 2021,
        mileage: 10000,
        lng: 123.45,
        lat: 67.89,
      };

      mockReportsService.createReport.mockResolvedValue({ id: 1, ...createReportDto });
      const result = await controller.createReport(createReportDto, mockUser);
      expect(result).toEqual({ id: 1, ...createReportDto });
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      const reportArray = [{ id: 1, price: 25000 }];
      mockReportsService.findAll.mockResolvedValue(reportArray);
      const result = await controller.findAll();
      expect(result).toEqual(reportArray);
    });
  });

  describe('createEstimate', () => {
    it('should return an estimate', async () => {
      const getEstimateDto: GetEstimateDto = { make: 'Toyota', model: 'Camry', year: 2020, mileage: 30000, lat: 34.05, lng: -118.24 };
      const estimate = { price: 25000 };
      mockReportsService.createEstimate.mockResolvedValue(estimate);
      const result = await controller.createEstimate(getEstimateDto);
      expect(result).toEqual(estimate);
    });
  });

  describe('getReviews', () => {
    it('should return reviews for a specific report', async () => {
      const reviewArray = [{ id: 1, rating: 4, comment: 'Great car!' }];
      mockReportsService.findById.mockResolvedValue({ id: mockReportId });
      mockReviewsService.getReviewsForReport.mockResolvedValue(reviewArray);

      const result = await controller.getReviews(mockReportId);
      expect(result).toEqual(reviewArray);
    });

    it('should throw NotFoundException if report is not found', async () => {
      mockReportsService.findById.mockResolvedValue(null);
      await expect(controller.getReviews(mockReportId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createReview', () => {
    it('should create a review for a specific report', async () => {
      const createReviewDto: CreateReviewDto = { rating: 5, content: 'Excellent' };
      const review = { id: 1, rating: 5, comment: 'Excellent' };

      mockReportsService.findById.mockResolvedValue({ id: mockReportId });
      mockReviewsService.createReview.mockResolvedValue(review);

      const result = await controller.createReview(createReviewDto, mockUser, mockReportId);
      expect(result).toEqual(review);
    });

    it('should throw NotFoundException if report is not found', async () => {
      mockReportsService.findById.mockResolvedValue(null);
      await expect(controller.createReview({ rating: 5, content: 'Good' }, mockUser, mockReportId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review for a specific report', async () => {
      mockReportsService.findById.mockResolvedValue({ id: mockReportId });
      await controller.deleteReview(mockReportId, mockReviewId, mockUser);
      expect(mockReviewsService.deleteReview).toHaveBeenCalledWith(mockReviewId, mockUser);
    });

    it('should throw NotFoundException if report is not found', async () => {
      mockReportsService.findById.mockResolvedValue(null);
      await expect(controller.deleteReview(mockReportId, mockReviewId, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  // Additional tests can be added for each endpoint (approveReport, updateReport, deleteReport) as needed
});
