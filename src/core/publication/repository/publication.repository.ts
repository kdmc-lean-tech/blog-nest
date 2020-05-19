import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Publication } from '../../../models/publication.entity';
import { CreatePublicationDto } from '../../../dtos/create-publication.dto';
import { deleteImgCloud, uploadFileCloud } from '../../../utils/upload-cloudinary';
import { User } from '../../../models/user.entity';
import { Trend } from '../../../models/trend.entity';
import { ActiveEntityDto } from '../../../dtos/active-entity.dto';
import { IFileCloudinary } from '../../../interfaces/file-cloudinay.interface';

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
        const trend = await Trend.findOne(idTrend);
        if (!trend) {
            throw new NotFoundException(`The id ${idTrend} trend not found`);
        }
        const publication = new Publication();
        publication.title = title;
        publication.content = content;
        publication.tags = tags;
        publication.user = user;
        publication.img = [];
        publication.publicImgId = [];
        publication.createdAt = new Date();
        publication.updatedAt = new Date();
        publication.trend = trend;
        publication.active = true;
        delete publication.user.password;
        try {
            await publication.save();
            return publication;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async updatePublicationById(publication: Publication, createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const { title, tags, content, idTrend } = createPublicationDto;
        const trend = await Trend.findOne(idTrend);
        if (!trend) {
            throw new NotFoundException(`The id ${idTrend} trend not found`);
        }
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

    public async changeStatusPublicationByEntity(
        publication: Publication, 
        activeEntityDto: ActiveEntityDto ): Promise<Publication> {
        const { active } = activeEntityDto;
        publication.active = active;
        publication.updatedAt = new Date();
        try {
            await publication.save();
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
        if (!publication) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        delete publication.user.password;
        return publication;
    }

    public async fileUpload(paths: string[], publication: Publication): Promise<Publication> {
        try {
            const results = [];
            paths.forEach((path) => {
                results.push(uploadFileCloud(path));
            });
            this.deleteImagesInCloud(publication.publicImgId, paths);
            const load = await this.loadImagesInCloud(results);
            publication.img = load.img;
            publication.publicImgId = load.publicImgId;
            try {
                await publication.save();
                return publication;
            } catch (err) {
                this.deleteImagesInCloud(publication.publicImgId, paths);
                throw new InternalServerErrorException(err);
            }
        } catch (err) {
            this.deleteImagesInCloud(publication.publicImgId, paths);
            throw new InternalServerErrorException(err);
        }
    }

    private async loadImagesInCloud(promises: Promise<any>[]) {
        const results = await Promise.all(promises);
        const img = [];
        const publicImgId = [];
        results.forEach((r: IFileCloudinary) => {
            img.push(r.secure_url);
            publicImgId.push(r.public_id);
        });
        return {img, publicImgId}
    }

    private async deleteImagesInCloud(publicImgIds: string[], paths: string[]) {
        publicImgIds.forEach(async (publicImgId) => {
            await deleteImgCloud(null, publicImgId);
        });
        paths.forEach(async (path) => {
            await deleteImgCloud(path, null);
        });
    }
}