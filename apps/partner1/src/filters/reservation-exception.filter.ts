import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import ValidationException from '../exceptions/validationException';

@Catch(Error)
export class ReservationExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof ValidationException
          ? HttpStatus.UNPROCESSABLE_ENTITY
          : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      exception.message.startsWith('Spots') &&
      exception.message.endsWith('not found')
    ) {
      response.status(HttpStatus.NOT_FOUND).json({
        message: exception.message,
      });
    } else if (
      exception.message.startsWith('Spots') &&
      exception.message.includes('not available')
    ) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: exception.message,
      });
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Some spots are already reserved',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }
  }
}
