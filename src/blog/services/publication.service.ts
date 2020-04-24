import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from '../repository/publication.repository';
import { Publication } from '../../models/publication.entity';
import { CreatePublicationDto } from '../../dtos/create-publication.dto';

@Injectable()
export class PublicationService {
    constructor(private _publicationRepository: PublicationRepository) {
    }

    async getAllPublications(): Promise<Publication[]> {
        return await this._publicationRepository.getAllPublications();
    }

    async createPublication(createPublicationDto: CreatePublicationDto): Promise<Publication> {
        return await this._publicationRepository.createPublication(createPublicationDto);
    }

    async updatePublicationById(id: number, createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const publication = await this._publicationRepository.findOne(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return await this._publicationRepository.updatePublicationById(publication, createPublicationDto);
    }

    async getPublicationById(id: number): Promise<Publication> {
        const publication = await this._publicationRepository.findOne(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return await publication;
    }

    async deletePublicationById(id: number): Promise<Publication> {
        const publication = await this._publicationRepository.findOne(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return await this._publicationRepository.deletePublicationByEntity(publication);
    }

    async fileUploadById(id: number, path: string): Promise<Publication> {
        const publication = await this._publicationRepository.findOne(id);
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return this._publicationRepository.fileUpload(path, publication);
    }
}
