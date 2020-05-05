import { Controller, Get, Body, UsePipes, ValidationPipe, Post, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, Res, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicationService } from '../services/publication.service';
import { CreatePublicationDto } from '../../../dtos/create-publication.dto';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { IFile } from '../../../interfaces/file';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from '../../../enums/roles.enum';
import { Roles } from '../../../decorators/roles.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../../../models/user.entity';

@Controller('publication')
export class PublicationController {
    constructor(private _publicationService: PublicationService) {
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.USER, ROLES.ADMIN)
    async getAllPublications() {
        return await this._publicationService.getAllPublications();
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.USER, ROLES.ADMIN)
    async getPublicationById(@Param('id', ParseIntPipe) id: number) {
        return await this._publicationService.getPublicationById(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.USER, ROLES.ADMIN)
    @UsePipes(ValidationPipe)
    async createPublication(@Body() createPublicationDto: CreatePublicationDto, @GetUser() user: User) {
        return await this._publicationService.createPublication(createPublicationDto, user);
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.USER, ROLES.ADMIN)
    @UsePipes(ValidationPipe)
    async updatePublication(
        @Param('id', ParseIntPipe) id: number,
        @Body() createPublicationDto: CreatePublicationDto,
    ) {
        return await this._publicationService.updatePublicationById(id, createPublicationDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.ADMIN)
    async deletePublicationById(@Param('id', ParseIntPipe) id: number) {
        return await this._publicationService.deletePublicationById(id);
    }

    @Post('/upload/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.USER, ROLES.ADMIN)
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
