import { Body, Controller, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 201,
        description: 'the user has successfully created',
        examples: {
            success: {
                value: {
                    id: 1,
                    email: 'test@test.com',
                },
                summary: 'The user has been successfully created',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Email already in use',
        examples: {
            emailInUse: {
                value: {
                    message: 'Email already in use',
                    error: 'Bad Request',
                },
                summary: 'The email is already in use',
            },
        },
    })
    @Post('/signup')
    @Serialize(UserDto)
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({
        status: 201,
        description: 'Successfully signed in',
        examples: {
            success: {
                value: {
                    id: 1,
                    email: 'test@test.com',
                },
                summary: 'Successfully signed in',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Bad password',
        examples: {
            badPassword: {
                value: {
                    message: 'Bad password',
                    error: 'Bad Request',
                },
                summary: 'The password is incorrect',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'User not found',
        examples: {
            userNotFound: {
                value: {
                    message: 'User not found',
                    error: 'Bad Request',
                },
                summary: 'The user is not found',
            },
        },
    })
    @Post('/signin')
    @Serialize(UserDto)
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    @ApiOperation({ summary: 'Sign out' })
    @ApiResponse({
        status: 201,
        description: 'Successfully signed out',
    })
    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }
}
