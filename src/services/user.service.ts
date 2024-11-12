import * as argon from 'argon2';

import { userDatamapper } from '../datamappers/index.datamapper';
import ApiError from '../errors/Api.error';

import { LoginUser, CreateUser } from "../types/user.type";

export default {
  async create(input: CreateUser): Promise<void> {
    const { nickname, email, password } = input;
    
    const emailAlreadyExists: LoginUser | null = await userDatamapper.findOne('email', email);
    if(emailAlreadyExists) {
      throw(new ApiError('Email already exists', 409));
    }

    const nicknameAlreadyExists: boolean = await userDatamapper.findOne('nickname', nickname);
    if(nicknameAlreadyExists) {
      throw(new ApiError('Nickname already exists', 409));
    }

    const hashedPassword: string = await argon.hash(password);
    await userDatamapper.create({
      nickname,
      email,
      password: hashedPassword,
    });

    return;
  },
}