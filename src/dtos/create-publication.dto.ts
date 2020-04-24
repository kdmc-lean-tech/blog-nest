import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreatePublicationDto {
    @IsNotEmpty()
    @MaxLength(50)
    title: string;
    @IsNotEmpty()
    @MaxLength(125)
    subtitle: string;
    @IsNotEmpty()
    content: string;
}