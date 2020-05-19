import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../models/user.entity';
import { uploadFileCloud, deleteImgCloud } from 'src/utils/upload-cloudinary';
import { InternalServerErrorException } from '@nestjs/common';
import { ChangePasswordDto } from 'src/dtos/change-password.dto';
import { encryptPassword } from 'src/utils/encrypt.utils';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

   public async fileUpload(path: string, user: User): Promise<User> {
        try {
            const result = await uploadFileCloud(path);
            try {
                await deleteImgCloud(path, user.publicImgId);
                user.img = result.secure_url;
                user.publicImgId = result.public_id;
                delete user.password;
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

    public async getUsers(): Promise<User[]> {
        const users = await this.createQueryBuilder("user")
        .getMany();
        users.forEach((user) => delete user.password);
        return users;
    }

    public async changePassword(
        changePasswordDto: ChangePasswordDto, user: User
        ): Promise<User> {
        const { password } = changePasswordDto;
        user.password = await encryptPassword(password);
        try {
          await user.save();
          delete user.password;
          return user;
        } catch (err) {
          throw new InternalServerErrorException(err);
        }
      }
}