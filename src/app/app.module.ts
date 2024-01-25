import { AuthModule } from '../auth/auth.module'
import { UserOperationsModule } from '../user-operations/user-operations.module'
import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { DatabaseModule } from '../database/database.module'
import { AppService } from './app.service'
// import { GlobalExceptionFilter } from 'src/responses/ global-exception.filter'
import { APP_FILTER } from '@nestjs/core'

dotenv.config()

@Module({
  imports: [DatabaseModule, AuthModule, UserOperationsModule],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: GlobalExceptionFilter,
    // },
    AppService,
  ],
})
export class AppModule {}
