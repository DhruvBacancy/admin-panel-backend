import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      //   throw err || new UnauthorizedException(info.message)
      throw new HttpException(info.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return user
  }
}
