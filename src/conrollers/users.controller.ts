import { Request, Response, NextFunction } from 'express';
import * as argon from 'argon2';

import { userDatamapper } from '../datamappers/index.datamapper';

import { CreateUser } from '../types/createUser.type';

export default {
  async store(req: Request<{}, {}, CreateUser>, res: Response, next: NextFunction): Promise<void> {
    if(!req.body) {
      return next(new ApiError('Missing request body', { status: 400 }));
    }
    const { nickname, email, password } = req.body;
    //type for alreadyExists variables
    const emailAlreadyExists = await userDatamapper.findOne('email', email);
    if(emailAlreadyExists) {
      return next(new ApiError('Email already exists', { status: 409 }));
    }

    const nicknameAlreadyExists = await userDatamapper.findOne('nickname', nickname);
    if(nicknameAlreadyExists) {
      return next(new ApiError('Nickname already exists', { status: 409 }));
    }

    //
    const hashedPassword: string = await argon.hash(password);
    await userDatamapper.create({
      nickname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully'});
  },

};
