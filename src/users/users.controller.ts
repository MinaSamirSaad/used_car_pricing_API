import { AuthService } from './auth.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Session,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDto } from 'src/reports/dtos/create-report.dto';
import { UserReportsDto } from './dtos/user-Reports.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }
    @UseGuards(AuthGuard)
    @Get('/whoami')
    @Serialize(UserDto)
    async whoami(@CurrentUser() user: UserDto) {
        return user
    }


    @Post('/signup')
    @Serialize(UserDto)
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Email already in use' })
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    @Serialize(UserDto)
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }
    @Get()
    @Serialize(UserDto)
    getUsers(@Query('email') email: string) {
        if (email) {
            return this.userService.findByEmail(email);
        } else {
            return this.userService.findAll();
        }
    }

    @Get('/:id')
    @Serialize(UserDto)
    getUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.findOne(id);
    }

    @Get('/:id/reports')
    @Serialize(UserReportsDto)
    getUserReports(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.getUserReports(id);
    }

    @Patch('/:id')
    @Serialize(UserDto)
    updateUser(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: UpdateUserDto,
    ) {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    @Serialize(UserDto)
    removeUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.remove(id);
    }

}
