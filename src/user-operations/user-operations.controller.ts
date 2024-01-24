import { Controller, Get, Patch, Delete } from '@nestjs/common'
import { UserOperationsService } from './user-operations.service'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('User-CRUD')
@Controller('/user')
export class UserOperationsController {
  constructor(private readonly userService: UserOperationsService) {}

  @Get()
  async findall(): Promise<{}> {
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
