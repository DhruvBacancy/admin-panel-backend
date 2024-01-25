import { Module } from '@nestjs/common'
import { UserOperationsService } from './user-operations.service'
import { UserOperationsController } from './user-operations.controller'
import { User } from 'src/models/user.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserOperationsController],
  providers: [UserOperationsService],
  exports: [UserOperationsService],
})
export class UserOperationsModule {}
