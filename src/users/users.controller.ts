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

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
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
    getUsers(@Query('email') email: string) {
        if (email) {
            return this.userService.findByEmail(email);
        } else {
            return this.userService.findAll();
        }
    }

    @Get('/:id')
    getUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.findOne(id);
    }

    @Patch('/:id')
    updateUser(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: UpdateUserDto,
    ) {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    removeUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.remove(id);
    }

}
