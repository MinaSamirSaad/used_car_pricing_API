import { MiddlewareConsumer, Module, RequestMethod, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).exclude(
      { path: 'auth/signup', method: RequestMethod.POST },
      { path: 'auth/signin', method: RequestMethod.POST },
      { path: 'auth/signout', method: RequestMethod.POST }
    ).forRoutes('*');

  }
}
