import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSpotRequest {
  @IsString({ message: 'Spot name in a incorrect type.', always: true })
  @MaxLength(255, {
    message: 'Spot name max length 255',
  })
  @IsNotEmpty({ message: 'Spot name is required', always: true })
  name: string;
}
