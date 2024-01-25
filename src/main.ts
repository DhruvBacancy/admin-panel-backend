import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import * as dotenv from 'dotenv'
import { GlobalExceptionsFilter } from './filter/global-exception.filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('admin')
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: '*',
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Admin-Panel-Backend')
    .setVersion('1.0.0')
    // .addBearerAuth(
    //   {
    //     description: `Please enter token in following format: Bearer <JWT>`,
    //     name: 'x-token',
    //     bearerFormat: 'Bearer',
    //     scheme: 'Bearer',
    //     type: 'http',
    //     in: 'Header',
    //   },
    //   'access-token',
    // )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalFilters(new GlobalExceptionsFilter())
  await app.listen(process.env.APP_PORT)
  console.log(`App running on http://localhost:${process.env.APP_PORT}`)
}
bootstrap()
