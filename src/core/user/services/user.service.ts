import { Injectable, UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ChangePasswordDto } from '../../../dtos/change-password.dto';
import { User } from '../../../models/user.entity';
import { encryptPassword } from '../../../utils/encrypt.utils';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {
  }

  public async changePassword(
    changePasswordDto: ChangePasswordDto, id: number
    ): Promise<User> {
    const { password } = changePasswordDto;
    const user = await this._userRepository.findOne(id);
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    user.password = await encryptPassword(password);
    try {
      await user.save();
      delete user.password;
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async fileUploadById(id: number, path: string): Promise<User> {
        const user = await this._userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return this._userRepository.fileUpload(path, user);
  }
}
