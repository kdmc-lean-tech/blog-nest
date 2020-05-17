import { Controller, Patch, Body, Param, ParseIntPipe, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChangePasswordDto } from '../../../dtos/change-password.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/enums/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { IFile } from 'src/interfaces/file';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {
  }

  @Patch('/:id/change')
  @UseGuards(AuthGuard('jwt'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('id', ParseIntPipe) id: number 
  ) {
    return await this._userService.changePassword(changePasswordDto, id);
  }

  @Post('/upload/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles(ROLES.USER, ROLES.ADMIN)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
    async uploadFile(@UploadedFile() file: IFile, @Param('id', ParseIntPipe) id: number) {
        if (file) {
            return await this._userService.fileUploadById(id, file.path);
        } 
    }
}
