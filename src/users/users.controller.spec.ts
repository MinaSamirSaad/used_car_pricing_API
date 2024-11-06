import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;

  const mockUser: UserDto = { id: 1, email: 'test@example.com' } as UserDto;

  beforeEach(async () => {
    usersService = {
      findAll: jest.fn().mockResolvedValue([mockUser]),
      findOne: jest.fn().mockResolvedValue(mockUser),
      getUserReports: jest.fn().mockResolvedValue([{ id: 1, price: 25000, make: 'Toyota', model: 'Camry' }]),
      update: jest.fn().mockResolvedValue({ ...mockUser, email: 'updated@example.com' }),
      remove: jest.fn().mockResolvedValue(mockUser),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('whoami', () => {
    it('should return the current user', async () => {
      const result = await controller.whoami(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const result = await controller.getUsers();
      expect(result).toEqual([mockUser]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a specific user by ID', async () => {
      const result = await controller.getUser(1);
      expect(result).toEqual(mockUser);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });

  });

  describe('getUserReports', () => {
    it('should return reports for a specific user by ID', async () => {
      const result = await controller.getUserReports(1);
      expect(result).toEqual(expect.arrayContaining([{ id: 1, price: 25000, make: 'Toyota', model: 'Camry' }]));
      expect(usersService.getUserReports).toHaveBeenCalledWith(1);
    });
  });

  describe('updateUser', () => {
    it('should update a specific user by ID', async () => {
      const updateUserDto: UpdateUserDto = { email: 'updated@example.com', password: 'updated' };
      const result = await controller.updateUser(1, updateUserDto, mockUser);

      expect(result).toEqual(expect.objectContaining({ email: 'updated@example.com' }));
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto, mockUser);
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      (usersService.update as jest.Mock).mockRejectedValue(new UnauthorizedException());

      const updateUserDto: UpdateUserDto = { email: 'updated@example.com', password: 'updated' };
      await expect(controller.updateUser(1, updateUserDto, mockUser)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('removeUser', () => {
    it('should delete a specific user by ID', async () => {
      const result = await controller.removeUser(1);
      expect(result).toEqual(mockUser);
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });


    it('should throw UnauthorizedException if user is not authorized', async () => {
      (usersService.remove as jest.Mock).mockRejectedValue(new UnauthorizedException());

      await expect(controller.removeUser(1)).rejects.toThrow(UnauthorizedException);
    });
  });
});
