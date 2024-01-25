import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (user.role === 'admin') {
      return user
    } else {
      throw new HttpException('Access is Forbidden', HttpStatus.FORBIDDEN)
    }
  }
}
