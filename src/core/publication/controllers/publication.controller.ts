import { Controller, Get, Body, UsePipes, ValidationPipe, Post, Put, Param, ParseIntPipe, UseGuards, Patch, UseInterceptors, UploadedFiles, /*UseInterceptors, UploadedFiles*/ } from '@nestjs/common';
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
import { ActiveEntityDto } from 'src/dtos/active-entity.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

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

    @Patch('/:id/active')
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.ADMIN)
    async changeStatusTrend(
        @Param('id', ParseIntPipe) id: number,
        @Body() activeEntityDto: ActiveEntityDto
    ) {
        return await this._publicationService.changeStatusTrendById(id, activeEntityDto);
    }

    @Post('/upload/:id')
    @UseInterceptors(FilesInterceptor('files', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName 
        }),
        fileFilter: imageFileFilter
    }))
    async uploadFiles(
        @UploadedFiles() files: IFile[],@Param('id', ParseIntPipe) id: number){
        const paths = [];
        files.forEach((file) => {
            paths.push(file.path);
        });
        return await this._publicationService.fileUploadById(id, paths);
    }
}
