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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { IsAdminGuard } from 'src/guards/admin.guard'
import { EditUserDto, IdDto } from './dto/user.dto'

@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('/user')
export class UserOperationsController {
  constructor(private readonly userService: UserOperationsService) {}

  @Get()
  findallUsers(@Request() req): Promise<{}> {
    return this.userService.getAllUsers()
  }

  @Get(':id')
  findOneUser(@Request() req, @Param() id: IdDto): Promise<any> {
    return this.userService.getUserById(id)
  }

  @Patch('edit/:id')
  editById(
    @Request() req,
    @Param() id: IdDto,
    @Body() body: EditUserDto,
  ): Promise<{}> {
    return this.userService.editUserById(id, body)
  }

  @Delete('delete/:id')
  deleteById(@Request() req, @Param() id: IdDto): Promise<{}> {
    return this.userService.deleteById(id)
  }
}
