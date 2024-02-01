import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import * as dotenv from 'dotenv'
import { GlobalExceptionsFilter } from './filter/global-exception.filter'
import { ValidationPipe } from '@nestjs/common'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('admin')
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: '*',
    credentials: true,
  })

  app.useGlobalFilters(new GlobalExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.APP_PORT)
  console.log(`App running on http://localhost:${process.env.APP_PORT}`)
}
bootstrap()
