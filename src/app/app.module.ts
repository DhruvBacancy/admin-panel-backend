import { AuthModule } from '../auth/auth.module'
import { UserOperationsModule } from '../user-operations/user-operations.module'
import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { DatabaseModule } from '../database/database.module'
import { AppService } from './app.service'

dotenv.config()

@Module({
  imports: [DatabaseModule, AuthModule, UserOperationsModule],
  providers: [AppService],
})
export class AppModule {}
