import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserOperationsModule } from './user-operations/user-operations.module'
import { DatabaseModule } from './database/database.module' // Import the DatabaseModule

@Module({
  imports: [DatabaseModule, AuthModule, UserOperationsModule],
})
export class AppModule {}
