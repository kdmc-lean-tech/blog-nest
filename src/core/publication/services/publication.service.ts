import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from '../repository/publication.repository';
import { Publication } from '../../../models/publication.entity';
import { CreatePublicationDto } from '../../../dtos/create-publication.dto';
import { User } from '../../../models/user.entity';
import { ActiveEntityDto } from 'src/dtos/active-entity.dto';

@Injectable()
export class PublicationService {
    constructor(private _publicationRepository: PublicationRepository) {
    }

    public async getAllPublications(): Promise<Publication[]> {
        return await this._publicationRepository.getAllPublications();
    }

    public async createPublication(createPublicationDto: CreatePublicationDto, user: User): Promise<Publication> {
        return await this._publicationRepository.createPublication(createPublicationDto, user);
    }

    public async updatePublicationById(id: number, createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const publication = await this._publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return await this._publicationRepository.updatePublicationById(publication, createPublicationDto);
    }

    public async getPublicationById(id: number): Promise<Publication> {
        const publication = await this._publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return await publication;
    }

    public async changeStatusTrendById(id: number, activeEntityDto: ActiveEntityDto): Promise<Publication> {
        const publication = await this._publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return this._publicationRepository.changeStatusPublicationByEntity(publication, activeEntityDto);
    }

    async fileUploadById(id: number, paths: string[]) {
        const publication = await this._publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return this._publicationRepository.fileUpload(paths, publication);
    }
}
