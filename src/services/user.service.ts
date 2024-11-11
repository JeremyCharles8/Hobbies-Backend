import { Request, Response, NextFunction } from 'express';
import * as argon from 'argon2';

import { userDatamapper } from '../datamappers/index.datamapper';
import ApiError from '../errors/Api.error';

import { LoginUser, CreateUser } from "../types/user.type";

export default {
  async store(req: Request<{}, {}, CreateUser>, res: Response, next: NextFunction): Promise<void> {
    const { nickname, email, password } = req.body;
    
    const emailAlreadyExists: LoginUser | null = await userDatamapper.findOne('email', email);
    if(emailAlreadyExists) {
      return next(new ApiError('Email already exists', 409));
    }

    const nicknameAlreadyExists: boolean = await userDatamapper.findOne('nickname', nickname);
    if(nicknameAlreadyExists) {
      return next(new ApiError('Nickname already exists', 409));
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
}