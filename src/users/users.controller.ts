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
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) { }
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email, body.password);
    }

    @Get()
    getUsers(@Query('email') email: string) {
        if (email) {
            return this.userService.findByEmail(email);
        } else {
            return this.userService.findAll();
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    getUser(@Param('id', new ParseIntPipe()) id: number) {
        console.log(this.userService.findOne(id));
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

    //   @Post('/signin')
    //   signIn() {
    //     return this.userService.signIn();
    //   }

    //   @Post('/signout')
    //   signOut() {
    //     return this.userService.signOut();
    //   }
}
