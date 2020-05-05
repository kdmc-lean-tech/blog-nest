import { EntityRepository, Repository, QueryBuilder } from 'typeorm';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Publication } from '../../../models/publication.entity';
import { CreatePublicationDto } from '../../../dtos/create-publication.dto';
import { deleteImgCloud, uploadFileCloud } from '../../../utils/upload-cloudinary';
import { User } from '../../../models/user.entity';

@EntityRepository(Publication)
export class PublicationRepository extends Repository<Publication> {
    
    public async getAllPublications(): Promise<Publication[]> {
        const publications = await this.createQueryBuilder("publication")
            .leftJoinAndSelect("publication.user", "user")
            .getMany();
        publications.map((p) => delete p.user['password']);
        return publications;
    }   

    public async createPublication(createPublicationDto: CreatePublicationDto, user: User): Promise<Publication> {
        const { title, subtitle, content } = createPublicationDto;
        const publication = new Publication();
        publication.title = title;
        publication.subtitle = subtitle;
        publication.content = content;
        publication.img = "";
        publication.public_id = "";
        publication.created_at = new Date();
        publication.updated_at = new Date();
        publication.user = user;
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async updatePublicationById(publication: Publication, createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const { title, subtitle, content } = createPublicationDto;
        publication.title = title;
        publication.subtitle = subtitle;
        publication.content = content;
        publication.updated_at = new Date();
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async deletePublicationByEntity(publication: Publication): Promise<Publication> {
        try {
            deleteImgCloud(null, publication.public_id);
            await this.delete(publication);
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async fileUpload(path: string, publication: Publication): Promise<Publication> {
        try {
            const result = await uploadFileCloud(path);
            try {
                await deleteImgCloud(path, publication.public_id);
                publication.img = result.secure_url;
                publication.public_id = result.public_id;
                publication.save();
                return publication;
            } catch (err) {
                await deleteImgCloud(path, publication.public_id);
                throw new InternalServerErrorException(err);
            }
        } catch (err) {
            await deleteImgCloud(path, publication.public_id);
            throw new InternalServerErrorException(err);
        }
    }

    public async getPublicationById(id: number): Promise<Publication> {
        const publication = await this.createQueryBuilder("publication")
            .leftJoinAndSelect("publication.user", "user")
            .where(`publication.id = :idPublication`, { idPublication: id })
            .getOne();
        delete publication.user["password"];
        return publication;
    }   
}