import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import * as dotenv from 'dotenv'
import { GlobalExceptionsFilter } from './filter/global-exception.filter'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionsFilter())
  app.setGlobalPrefix('admin')
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: '*',
    credentials: true,
  })
  await app.listen(process.env.APP_PORT)
  console.log(`App running on http://localhost:${process.env.APP_PORT}`)
}
bootstrap()
