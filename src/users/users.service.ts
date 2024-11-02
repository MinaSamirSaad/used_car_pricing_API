import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Report } from 'src/reports/report.entity';
import { UserDto } from './dtos/user.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    async create(email: string, password: string): Promise<User> {
        const user = new User();
        user.email = email;
        user.password = password;
        return await this.usersRepository.save(user);
    }
    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.reports
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email: email } });
        return user
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async update(id: number, newUser: Partial<User>, currentUser: UserDto): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (currentUser.id !== user.id) {
            throw new UnauthorizedException('User not found');
        }
        Object.assign(user, newUser);
        return await this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.usersRepository.remove(user);
    }

    async getUserReports(id: number): Promise<Report[]> {
        const user = await this.usersRepository.findOne({ where: { id: id }, relations: ['reports'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.reports;
    }
}
