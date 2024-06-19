import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventRequest {
  @IsString({ message: 'Event name in a incorrect type.', always: true })
  @MaxLength(255, {
    message: 'Event name max length 255',
  })
  @IsNotEmpty({ message: 'Event name is required', always: true })
  name: string;

  @IsString({ message: 'Event description in a incorrect type.', always: true })
  @MaxLength(255, {
    message: 'Event description max length 255',
  })
  @IsNotEmpty({ message: 'Event description is required', always: true })
  description: string;

  @IsString({ message: 'Event date in a incorrect type.', always: true })
  @IsNotEmpty({ message: 'Event date is required', always: true })
  @IsDateString(
    {
      strict: true,
    },
    {
      message: 'Event date needs to be in ISO 8601 format',
      always: true,
    },
  )
  date: string;

  @IsNumber(
    { allowNaN: false },
    { message: 'Event price needs to be a number type', always: true },
  )
  @IsNotEmpty({ message: 'Event price is required', always: true })
  @Min(0, { message: 'Event price needs to be more than 0', always: true })
  price: number;
}
