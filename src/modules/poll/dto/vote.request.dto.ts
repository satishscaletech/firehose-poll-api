import { IsNotEmpty, IsUUID } from 'class-validator';

export class VoteRequestDto {
  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @IsNotEmpty()
  @IsUUID()
  optionId: string;
}
