import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}