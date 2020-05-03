import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const auth = req.headers['authorization'];
    const token = auth?.split('Bearer ')[1];
    const user = jwt.decode(token);
    if (user) {
      req.user = user;
    }
    next();
  }
}
