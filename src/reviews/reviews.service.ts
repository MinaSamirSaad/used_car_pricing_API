import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { User } from 'src/users/user.entity';
import { Report } from 'src/reports/report.entity';
import { ReportUserDto } from '@src/reports/dtos/report-user.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
    ) { }

    async createReview(createReviewDto: CreateReviewDto, user: User, report: Report | ReportUserDto): Promise<Review> {
        if (report.user.id === user.id) {
            throw new BadRequestException('You cannot review your own report');
        }
        const review = this.reviewRepository.create({ ...createReviewDto, user, report });
        return await this.reviewRepository.save(review);
    }

    async getReviewsForReport(reportId: number): Promise<Review[]> {
        return await this.reviewRepository.find({ where: { report: { id: reportId } }, relations: ['user', 'report'] });
    }

    async getReviewsByUser(userId: number): Promise<Review[]> {
        return await this.reviewRepository.find({ where: { user: { id: userId } }, relations: ['report'] });
    }

    async getReviewById(reviewId: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        return review;
    }

    async deleteReview(reviewId: number, user: User): Promise<void> {
        const review = await this.getReviewById(reviewId);
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        if (review?.user?.id !== user?.id) {
            throw new UnauthorizedException('Unauthorized access');
        }
        const result = await this.reviewRepository.delete({ id: reviewId });
        if (result.affected === 0) {
            throw new BadRequestException('Review could not be deleted or some errors were encountered');
        }
    }

    async updateReview(reviewId: number, updateReviewDto: CreateReviewDto, user: User): Promise<Review> {
        const review = await this.getReviewById(reviewId);
        if (review.user.id !== user.id) {
            throw new UnauthorizedException('Unauthorized access');
        }
        Object.assign(review, updateReviewDto);
        return await this.reviewRepository.save(review);
    }
}
