import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Dialect } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
