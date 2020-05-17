import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Publication } from '../../../models/publication.entity';
import { CreatePublicationDto } from '../../../dtos/create-publication.dto';
// import { deleteImgCloud, uploadFileCloud } from '../../../utils/upload-cloudinary';
import { User } from '../../../models/user.entity';

@EntityRepository(Publication)
export class PublicationRepository extends Repository<Publication> {
    
    public async getAllPublications(): Promise<Publication[]> {
        const publications = await this.createQueryBuilder("publication")
            .leftJoinAndSelect("publication.user", "user")
            .leftJoinAndSelect("publication.trend", "trend")
            .getMany();
        publications.forEach((p) => delete p.user['password']);
        return publications;
    }  

    public async createPublication(
        createPublicationDto: CreatePublicationDto, user: User): Promise<Publication> {
        const { title, tags, content, idTrend } = createPublicationDto;
        const publication = new Publication();
        publication.title = title;
        publication.content = content;
        publication.tags = tags;
        publication.user = user;
        publication.img = [];
        publication.publicImgId = [];
        publication.createdAt = new Date();
        publication.updatedAt = new Date();
        publication.trend.id = idTrend;
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async updatePublicationById(publication: Publication, createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const { title, tags, content } = createPublicationDto;
        publication.title = title;
        publication.content = content;
        publication.tags = tags;
        publication.updatedAt = new Date();
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async deletePublicationByEntity(publication: Publication): Promise<Publication> {
        try {
            // deleteImgCloud(null, publication.public_id);
            await this.delete(publication);
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async getPublicationById(id: number): Promise<Publication> {
        const publication = await this.createQueryBuilder("publication")
            .leftJoinAndSelect("publication.user", "user")
            .leftJoinAndSelect("publication.trend", "trend")
            .where(`publication.id = :idPublication`, { idPublication: id })
            .getOne();
        delete publication.user.password;
        return publication;
    }   

    // public async fileUpload(path: string, publication: Publication): Promise<Publication> {
    //     try {
    //         const result = await uploadFileCloud(path);
    //         try {
    //             await deleteImgCloud(path, publication.public_id);
    //             publication.img = result.secure_url;
    //             publication.public_id = result.public_id;
    //             publication.save();
    //             return publication;
    //         } catch (err) {
    //             await deleteImgCloud(path, publication.public_id);
    //             throw new InternalServerErrorException(err);
    //         }
    //     } catch (err) {
    //         await deleteImgCloud(path, publication.public_id);
    //         throw new InternalServerErrorException(err);
    //     }
    // }

    // public async fileUpload(paths: string[], publication: Publication) {
    //     try {
    //         const results = [];
    //         paths.forEach((path) => {
    //             results.push(uploadFileCloud(path));
    //         });
    //         console.log(results);
    //     } catch (err) {
            
    //     }
    // }
}