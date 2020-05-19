import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ChangePasswordDto } from '../../../dtos/change-password.dto';
import { User } from '../../../models/user.entity';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {
  }

  public async changePassword(
    changePasswordDto: ChangePasswordDto, id: number
    ): Promise<User> {
    const user = await this._userRepository.findOne(id);
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    return this._userRepository.changePassword(changePasswordDto, user);
  }

  public async fileUploadById(id: number, path: string): Promise<User> {
        const user = await this._userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`The id ${id} not found`);
        }
        return this._userRepository.fileUpload(path, user);
  }

  public getUsers(): Promise<User[]> {
    return this._userRepository.getUsers();
  }
}
