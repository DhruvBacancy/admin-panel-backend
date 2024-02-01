import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiResponse } from '../response-format/response'
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception?.response?.message) {
      exception.message = exception?.response?.message
    }

    if (exception instanceof HttpException) {
      const errorResponseData: ApiResponse<any> = {
        code: exception.getStatus(),
        status: false,
        message: exception.message,
        data: {},
      }
      response.status(exception.getStatus()).json(errorResponseData)
    } else {
      console.log(exception)
      const errorResponseData: ApiResponse<any> = {
        code: exception.getStatus(),
        status: false,
        message: 'Internal server error',
        data: {},
      }
      response.status(500).json(errorResponseData)
    }
  }
}
