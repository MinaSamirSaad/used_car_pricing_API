import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserReportsDto } from './dtos/user-Reports.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    // ----------------------------------------------------------------
    @ApiOperation({ summary: 'get current user it is for testing' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved current user',
        type: UserDto,
        examples: {
            success: {
                value: {
                    id: 1,
                    email: 'test@example.com',
                },
                summary: 'Successfully retrieved current user',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        examples: {
            notAuthorized: {
                value: {
                    message: 'Unauthorized',
                    error: "Unauthorized",
                },
                summary: 'You are not authorized to access this resource',
            },
        },
    })
    @UseGuards(AuthGuard)
    @Get('/whoami')
    @Serialize(UserDto)
    async whoami(@CurrentUser() user: UserDto) {
        return user
    }

    @ApiOperation({ summary: 'get all users' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved users',
        type: UserDto,
        examples: {
            success: {
                value: [{
                    id: 1,
                    email: 'test@example.com',
                }],
                summary: 'Successfully retrieved users',
            },
        },
    })
    @Get()
    @Serialize(UserDto)
    getUsers() {
        return this.userService.findAll();
    }

    // ----------------------------------------------------------------

    @ApiOperation({ summary: 'get specific user by id' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved user',
        type: UserDto,
        examples: {
            success: {
                value: {
                    id: 1,
                    email: 'test@example.com',
                },
                summary: 'Successfully retrieved user',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'user not found',
        examples: {
            notFound: {
                value: {
                    message: 'User not found',
                    error: "Not Found",
                },
                summary: 'there is no user with this id',
            },
        },
    })
    @Get('/:id')
    @Serialize(UserDto)
    getUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.findOne(id);
    }

    // ----------------------------------------------------------------
    @ApiOperation({ summary: 'get reports of specific user by id' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved user reports',
        type: UserReportsDto,
        examples: {
            success: {
                value: [{
                    "id": 1,
                    "price": 25000,
                    "make": "toyota",
                    "model": "camry",
                    "year": 2020,
                    "mileage": 50000,
                    "lng": -118,
                    "lat": 34
                }],
                summary: 'Successfully retrieved user reports',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'user not found',
        examples: {
            notFound: {
                value: {
                    message: 'User not found',
                    error: "Not Found",
                },
                summary: 'there is no user with this id',
            },
        },
    })
    @Get('/:id/reports')
    @Serialize(UserReportsDto)
    getUserReports(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.getUserReports(id);
    }

    // ----------------------------------------------------------------
    @ApiOperation({ summary: 'update specific user by id' })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated user',
        type: UserDto,
        examples: {
            success: {
                value: {
                    id: 1,
                    email: 'test123@test.com'
                },
                summary: 'Successfully updated user',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'user not found',
        examples: {
            notFound: {
                value: {
                    message: 'User not found',
                    error: "Not Found",
                },
                summary: 'there is no user with this id',
            },
        },
    })
    @Patch('/:id')
    @Serialize(UserDto)
    @UseGuards(AuthGuard)
    updateUser(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: UpdateUserDto,
        @CurrentUser() user: UserDto
    ) {
        return this.userService.update(id, body, user);
    }
    // ----------------------------------------------------------------
    @ApiOperation({ summary: 'delete specific user by id' })
    @ApiResponse({
        status: 200,
        description: 'Successfully deleted user',
        examples: {
            success: {
                value: {
                    email: 'test@example.com'
                },
                summary: 'Successfully deleted user',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'user not found',
        examples: {
            notFound: {
                value: {
                    message: 'User not found',
                    error: "Not Found",
                },
                summary: 'there is no user with this id',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        examples: {
            notAuthorized: {
                value: {
                    message: 'Unauthorized',
                    error: "Unauthorized",
                },
                summary: 'You are not authorized to access this resource it is for admin',
            },
        },
    })
    @Delete('/:id')
    @Serialize(UserDto)
    @UseGuards(AdminGuard)
    removeUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.remove(id);
    }

}
