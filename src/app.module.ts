import { AuthModule } from './auth/auth.module'
import { UserOperationsModule } from './user-operations/user-operations.module'
import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { DatabaseModule } from './database/database.module'

dotenv.config()

@Module({
  imports: [AuthModule, UserOperationsModule, DatabaseModule],
})
export class AppModule {}
