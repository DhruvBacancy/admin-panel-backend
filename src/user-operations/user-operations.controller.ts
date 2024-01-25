import {
  Controller,
  Get,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { UserOperationsService } from './user-operations.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
@ApiTags('User-CRUD')
@Controller('/user')
export class UserOperationsController {
  constructor(private readonly userService: UserOperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findall(@Request() req): Promise<{}> {
    console.log('dvvsrv')
    return
  }

  @Get(':id')
  async findOne(): Promise<{}> {
    console.log('in id')
    return
  }

  @Patch('edit/:id')
  async editbyid(): Promise<{}> {
    console.log('in patch id')
    return
  }

  @Delete('delete/:id')
  async delete(): Promise<{}> {
    console.log('in delte id')
    return
  }
}
