import { ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log(request.currentUser);
        if (request.currentUser && request.currentUser.isAdmin) {
            return true;
        };
        throw new UnauthorizedException('Unauthorized access');
    }
}
