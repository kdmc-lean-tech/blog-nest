import { extname } from "path";
import { Request } from 'express';

export const imageFileFilter = (req: Request, file: any, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req: Request, file: any, callback) => {
    const name: string = file.originalname.split('.')[0];
    const fileExtName: string = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};