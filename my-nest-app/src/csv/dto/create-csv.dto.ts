import { IsString, IsEmail } from 'class-validator';

export class CreateCsvDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  body: string;
}
