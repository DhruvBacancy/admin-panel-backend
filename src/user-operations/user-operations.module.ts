import { Module } from '@nestjs/common'
import { UserOperationsService } from './user-operations.service'
import { UserOperationsController } from './user-operations.controller'

@Module({
  controllers: [UserOperationsController],
  providers: [UserOperationsService],
})
export class UserOperationsModule {}
