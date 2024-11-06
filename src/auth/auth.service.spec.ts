import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should create a new user if email is not in use', async () => {
      const email = 'test@test.com';
      const password = 'password123';

      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
      (usersService.create as jest.Mock).mockResolvedValue({
        id: 1,
        email,
        password: 'hashed_password',
      });

      const result = await authService.signUp(email, password);

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(usersService.create).toHaveBeenCalled();
      expect(result).toEqual({ id: 1, email, password: 'hashed_password' });
    });

    it('should throw an error if email is already in use', async () => {
      const email = 'test@test.com';
      const password = 'password123';

      (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email, password: 'hashed_password' });

      await expect(authService.signUp(email, password)).rejects.toThrow(BadRequestException);
    });
  });

  describe('signIn', () => {
    it('should return the user if credentials are correct', async () => {
      const email = 'test@test.com';
      const password = 'password123';
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const storedPassword = `${salt}.${hash.toString('hex')}`;

      (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email, password: storedPassword });

      const result = await authService.signIn(email, password);

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual({ id: 1, email, password: storedPassword });
    });

    it('should throw an error if user is not found', async () => {
      const email = 'notfound@test.com';
      const password = 'password123';

      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if password is incorrect', async () => {
      const email = 'test@test.com';
      const password = 'password123';
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt('wrongpassword', salt, 32)) as Buffer;
      const storedPassword = `${salt}.${hash.toString('hex')}`;

      (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email, password: storedPassword });

      await expect(authService.signIn(email, password)).rejects.toThrow(BadRequestException);
    });
  });
});
