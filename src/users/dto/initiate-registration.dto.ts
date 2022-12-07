import { IsString } from 'class-validator';

export class InitiateRegistrationDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
