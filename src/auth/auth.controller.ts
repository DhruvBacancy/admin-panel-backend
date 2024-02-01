import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiResponse } from '../response-format/response'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() body: any): Promise<any> {
    return this.authService.registerUser(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any): Promise<any> {
    return this.authService.loginUser(body)
  }
}
