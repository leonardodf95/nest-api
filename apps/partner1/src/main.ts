import { NestFactory } from '@nestjs/core';
import { Partner1Module } from './partner1.module';
import { ValidationPipe } from '@nestjs/common';
import { ReservationExceptionFilter } from './filters/reservation-exception.filter';
import ValidationException from './exceptions/validationException';

async function bootstrap() {
  const app = await NestFactory.create(Partner1Module);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
        );
        return new ValidationException(messages.join(', '));
      },
    }),
  );
  app.useGlobalFilters(new ReservationExceptionFilter());
  await app.listen(3000);
}
bootstrap();
