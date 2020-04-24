import { EntityRepository, Repository, QueryBuilder } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Publication } from '../../models/publication.entity';
import { CreatePublicationDto } from '../../dtos/create-publication.dto';
import { existsSync, unlinkSync } from 'fs';
var cloudinary = require('cloudinary').v2;

@EntityRepository(Publication)
export class PublicationRepository extends Repository<Publication> {
    
    async getAllPublications(): Promise<Publication[]> {
        const query = this.createQueryBuilder();
        return query.getMany();
    }

    async createPublication(createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const { title, subtitle, content } = createPublicationDto;
        const publication = new Publication();
        publication.title = title;
        publication.subtitle = subtitle;
        publication.content = content;
        publication.img = "";
        publication.public_id = "";
        publication.create_at = new Date();
        publication.update_at = new Date();
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async updatePublicationById(publication: Publication, createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const { title, subtitle, content  } = createPublicationDto;
        publication.title = title;
        publication.subtitle = subtitle;
        publication.content = content;
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async deletePublicationByEntity(publication: Publication): Promise<Publication> {
        try {
            cloudinary.uploader.destroy(publication.public_id);
            await this.delete(publication);
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async fileUpload(path: string, publication: Publication): Promise<Publication> {
        try {
            const uploadToCloudinary = cloudinary.uploader.upload(path, function(err, result) {
                if (err) {
                    throw new InternalServerErrorException(err);
                }
                return result.secure_url;
            });
            if (existsSync(path)) {
                unlinkSync(path);
            }
            const result = await uploadToCloudinary;
            try {
                cloudinary.uploader.destroy(publication.public_id);
                publication.img = result.secure_url;
                publication.public_id = result.public_id;
                publication.save();
                return publication;
            } catch (err) {
                throw new InternalServerErrorException(err);
            }
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}