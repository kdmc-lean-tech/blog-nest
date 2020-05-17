import { IsNotEmpty } from 'class-validator';

export class CreateTrendDto {
  @IsNotEmpty()
  name: string;
}