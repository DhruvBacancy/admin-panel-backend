import {
  Controller,
  Get,
  Patch,
  Delete,
  UseGuards,
  Request,
  Param,
  Body,
} from '@nestjs/common'
import { UserOperationsService } from './user-operations.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { IsAdminGuard } from 'src/guards/admin.guard'
@ApiTags('User-CRUD')
@Controller('/user')
export class UserOperationsController {
  constructor(private readonly userService: UserOperationsService) {}

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Get()
  findallUsers(@Request() req): Promise<{}> {
    return this.userService.getAllUsers()
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Get(':id')
  findOneUser(@Request() req, @Param() id): Promise<any> {
    return this.userService.getUserById(id)
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Patch('edit/:id')
  editById(@Request() req, @Param() id, @Body() body): Promise<{}> {
    return this.userService.editUserById(id, body)
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete('delete/:id')
  deleteById(@Request() req, @Param() id): Promise<{}> {
    return this.userService.deleteById(id)
  }
}
