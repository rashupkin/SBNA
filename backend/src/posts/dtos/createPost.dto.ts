import { MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @MinLength(3)
  description: string;

  userId: number;
}
