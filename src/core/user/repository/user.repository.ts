import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../models/user.entity';
import { uploadFileCloud, deleteImgCloud } from 'src/utils/upload-cloudinary';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

   public async fileUpload(path: string, user: User): Promise<User> {
        try {
            const result = await uploadFileCloud(path);
            try {
                await deleteImgCloud(path, user.publicImgId);
                user.img = result.secure_url;
                user.publicImgId = result.public_id;
                user.save();
                return user;
            } catch (err) {
                await deleteImgCloud(path, user.publicImgId);
                throw new InternalServerErrorException(err);
            }
        } catch (err) {
            await deleteImgCloud(path, user.publicImgId);
            throw new InternalServerErrorException(err);
        }
    }
}