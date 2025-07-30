import { MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @MinLength(3)
  @MaxLength(80)
  username: string;

  @MaxLength(255)
  email: string;

  @MinLength(8)
  @MaxLength(80)
  password: string;
}
