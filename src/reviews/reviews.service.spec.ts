import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from '../users/user.entity';
import { Report } from '../reports/report.entity';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review.dto';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let reviewRepository: Repository<Review>;

  const mockReviewRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockUser: User = { id: 1 } as User;
  const mockReport: Report = { id: 1, user: { id: 2 } as User } as Report;
  const mockReview: Review = { id: 1, user: mockUser, report: mockReport } as Review;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: getRepositoryToken(Review), useValue: mockReviewRepository },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    reviewRepository = module.get<Repository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReview', () => {
    it('should throw BadRequestException if user reviews their own report', async () => {
      await expect(
        service.createReview({ content: 'test' } as CreateReviewDto, mockUser, { ...mockReport, user: mockUser })
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a review if valid', async () => {
      mockReviewRepository.create.mockReturnValue(mockReview);
      mockReviewRepository.save.mockResolvedValue(mockReview);

      const result = await service.createReview({ content: 'test' } as CreateReviewDto, mockUser, mockReport);
      expect(result).toEqual(mockReview);
    });
  });

  describe('getReviewsForReport', () => {
    it('should return reviews for a specific report', async () => {
      mockReviewRepository.find.mockResolvedValue([mockReview]);
      const result = await service.getReviewsForReport(mockReport.id);
      expect(result).toEqual([mockReview]);
    });
  });

  describe('getReviewsByUser', () => {
    it('should return reviews by a specific user', async () => {
      mockReviewRepository.find.mockResolvedValue([mockReview]);
      const result = await service.getReviewsByUser(mockUser.id);
      expect(result).toEqual([mockReview]);
    });
  });

  describe('getReviewById', () => {
    it('should return a review if found', async () => {
      mockReviewRepository.findOne.mockResolvedValue(mockReview);
      const result = await service.getReviewById(mockReview.id);
      expect(result).toEqual(mockReview);
    });

    it('should throw NotFoundException if review not found', async () => {
      mockReviewRepository.findOne.mockResolvedValue(null);
      await expect(service.getReviewById(mockReview.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review if user is authorized', async () => {
      mockReviewRepository.findOne.mockResolvedValue(mockReview);
      mockReviewRepository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.deleteReview(mockReview.id, mockUser)).resolves.not.toThrow();
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      mockReviewRepository.findOne.mockResolvedValue({ ...mockReview, user: { id: 2 } });
      await expect(service.deleteReview(mockReview.id, mockUser)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if review not found', async () => {
      mockReviewRepository.findOne.mockResolvedValue(null);
      await expect(service.deleteReview(mockReview.id, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateReview', () => {
    it('should update a review if user is authorized', async () => {
      mockReviewRepository.findOne.mockResolvedValue(mockReview);
      mockReviewRepository.save.mockResolvedValue(mockReview);

      const updatedReview = await service.updateReview(mockReview.id, { content: 'updated' } as CreateReviewDto, mockUser);
      expect(updatedReview).toEqual(mockReview);
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      mockReviewRepository.findOne.mockResolvedValue({ ...mockReview, user: { id: 2 } });
      await expect(
        service.updateReview(mockReview.id, { content: 'updated' } as CreateReviewDto, mockUser)
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
