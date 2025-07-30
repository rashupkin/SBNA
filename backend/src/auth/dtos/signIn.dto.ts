import { MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @MinLength(3)
  @MaxLength(80)
  username: string;

  @MinLength(8)
  @MaxLength(80)
  password: string;
}
