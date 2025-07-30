import { MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @MinLength(3)
  @MaxLength(500)
  text: string;

  userId: number;

  postId: string;
}
