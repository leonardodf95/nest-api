import { TicketKind } from '@prisma/client';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReserveSpotRequest {
  @IsNotEmpty({ message: 'Spots is required', always: true })
  @IsArray({
    always: true,
    message: 'Spots needs to be a list',
  })
  @IsString({ each: true })
  spots: string[]; //['A1', 'A2']

  @IsString()
  @IsIn(['full', 'half'])
  @IsNotEmpty()
  ticket_kind: TicketKind;

  @IsString()
  @IsOptional()
  email: string;
}
