import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Report } from '../reports/report.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Partial<Repository<User>>;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'password',
    reports: [{ id: 1, price: 20000, make: 'Toyota', model: 'Camry', year: 2020, mileage: 50000 }] as Report[],
  } as User;

  beforeEach(async () => {
    usersRepository = {
      save: jest.fn().mockResolvedValue(mockUser),
      findOne: jest.fn().mockResolvedValue(mockUser),
      find: jest.fn().mockResolvedValue([mockUser]),
      remove: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await service.create('test@example.com', 'password');
      expect(result).toEqual(mockUser);
      expect(usersRepository.save).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com', password: 'password' }));
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user not found', async () => {
      (usersRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(usersRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user if authorized', async () => {
      const updatedUser = { email: 'updated@example.com' };
      const result = await service.update(1, updatedUser, { id: 1, email: 'test@example.com' });
      expect(result).toEqual(expect.objectContaining(updatedUser));
      expect(usersRepository.save).toHaveBeenCalledWith(expect.objectContaining(updatedUser));
    });

    it('should throw NotFoundException if user is not found', async () => {
      (usersRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.update(999, { email: 'new@example.com' }, { id: 999, email: 'test@example.com' })).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      await expect(service.update(1, { email: 'new@example.com' }, { id: 2, email: 'test1@example.com' })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      await service.remove(1);
      expect(usersRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      (usersRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserReports', () => {
    it('should return user reports', async () => {
      const result = await service.getUserReports(1);
      expect(result).toEqual(expect.arrayContaining([{ "id": 1, "make": "Toyota", "mileage": 50000, "model": "Camry", "price": 20000, "year": 2020 }]));
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['reports'] });
    });

    it('should throw NotFoundException if user is not found', async () => {
      (usersRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.getUserReports(999)).rejects.toThrow(NotFoundException);
    });
  });
});
