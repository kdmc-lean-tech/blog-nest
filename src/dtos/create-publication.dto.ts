import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreatePublicationDto {
    @IsNotEmpty()
    @MaxLength(50)
    title: string;
    @IsOptional()
    tags: string[];
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    idTrend: number;
}