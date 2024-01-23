import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
