import { IsNotEmpty } from 'class-validator';

export class ActiveEntityDto {
  @IsNotEmpty()
  active: boolean;
}