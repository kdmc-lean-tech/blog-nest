import { Controller, Get, Body, UsePipes, ValidationPipe, Post, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicationService } from '../services/publication.service';
import { CreatePublicationDto } from '../../dtos/create-publication.dto';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { IFile } from '../../interfaces/file';

@Controller('publication')
export class PublicationController {
    constructor(private _publicationService: PublicationService) {
    }

    @Get()
    async getAllPublications() {
        return await this._publicationService.getAllPublications();
    }

    @Get('/:id')
    async getPublicationById(@Param('id', ParseIntPipe) id: number) {
        return await this._publicationService.getPublicationById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createPublication(@Body() createPublicationDto: CreatePublicationDto) {
        return await this._publicationService.createPublication(createPublicationDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePublication(
        @Param('id', ParseIntPipe) id: number,
        @Body() createPublicationDto: CreatePublicationDto,
    ) {
        return await this._publicationService.updatePublicationById(id, createPublicationDto);
    }

    @Delete('/:id')
    async deletePublicationById(@Param('id', ParseIntPipe) id: number) {
        return await this._publicationService.deletePublicationById(id);
    }

    @Post('/upload/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
    async uploadFile(@UploadedFile() file: IFile, @Param('id', ParseIntPipe) id: number) {
        if (file) {
            return await this._publicationService.fileUploadById(id, file.path);
        } 
    }
}
