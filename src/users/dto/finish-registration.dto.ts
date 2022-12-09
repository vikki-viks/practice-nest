import { IsString } from 'class-validator';

export class FinishRegistrationDto {
  @IsString()
  token: string;
}
