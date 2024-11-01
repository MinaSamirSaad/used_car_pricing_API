import { ExecutionContext, CanActivate } from '@nestjs/common';

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.currentUser && request.currentUser.isAdmin;
    }
}
