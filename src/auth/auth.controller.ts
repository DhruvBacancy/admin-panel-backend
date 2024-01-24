import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any): Promise<string> {
    return this.authService.registerUser(body)
  }

  @Post('login')
  async login(
    @Body() body: any,
  ): Promise<{ token: string; role: string; id: string }> {
    return this.authService.loginUser(body)
  }
}
