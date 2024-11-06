import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('createUser', () => {
    it('should create a user and set session', async () => {
      const body: CreateUserDto = { email: 'test@test.com', password: 'password123' };
      const mockSession = {};
      const createdUser = { id: 1, email: 'test@test.com' };

      (authService.signUp as jest.Mock).mockResolvedValue(createdUser);

      const result = await authController.createUser(body, mockSession);

      expect(authService.signUp).toHaveBeenCalledWith(body.email, body.password);
      expect(mockSession).toHaveProperty('userId', createdUser.id);
      expect(result).toEqual(createdUser);
    });

    it('should throw an error if email is already in use', async () => {
      const body: CreateUserDto = { email: 'test@test.com', password: 'password123' };
      const mockSession = {};

      (authService.signUp as jest.Mock).mockRejectedValue(new Error('Email already in use'));

      await expect(authController.createUser(body, mockSession)).rejects.toThrow(
        'Email already in use',
      );
    });
  });

  describe('signIn', () => {
    it('should sign in a user and set session', async () => {
      const body: CreateUserDto = { email: 'test@test.com', password: 'password123' };
      const mockSession = {};
      const signedInUser = { id: 1, email: 'test@test.com' };

      (authService.signIn as jest.Mock).mockResolvedValue(signedInUser);

      const result = await authController.signIn(body, mockSession);

      expect(authService.signIn).toHaveBeenCalledWith(body.email, body.password);
      expect(mockSession).toHaveProperty('userId', signedInUser.id);
      expect(result).toEqual(signedInUser);
    });

    it('should throw an error if password is incorrect', async () => {
      const body: CreateUserDto = { email: 'test@test.com', password: 'wrongpassword' };
      const mockSession = {};

      (authService.signIn as jest.Mock).mockRejectedValue(new Error('Bad password'));

      await expect(authController.signIn(body, mockSession)).rejects.toThrow('Bad password');
    });

    it('should throw an error if user is not found', async () => {
      const body: CreateUserDto = { email: 'notfound@test.com', password: 'password123' };
      const mockSession = {};

      (authService.signIn as jest.Mock).mockRejectedValue(new Error('User not found'));

      await expect(authController.signIn(body, mockSession)).rejects.toThrow('User not found');
    });
  });

  describe('signOut', () => {
    it('should sign out a user by clearing session userId', () => {
      const mockSession = { userId: 1 };

      authController.signOut(mockSession);

      expect(mockSession.userId).toBeNull();
    });
  });
});
