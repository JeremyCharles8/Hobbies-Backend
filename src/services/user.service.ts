import * as argon from 'argon2';

import { userDatamapper } from '../datamappers/index.datamapper';
import ApiError from '../errors/Api.error';

import { LoginUser, CreateUser, User, PublicUser, AdminUser, UpdateUser } from "../types/user.type";
//TODO End delete, login, logout methods and manage errors.
export default {
  async getAll(): Promise<User[]> {
    //TODO Check if request come from an admin
    const users = await userDatamapper.findAll();
    return users;
  },
  //TODO Fix Promise's type issue
  async getOne(id: number): Promise<User | PublicUser | AdminUser | null> {
    //TODO Check if request come from an admin or another user
    const user = await userDatamapper.findByPk(id);
    return user;
  },

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

  async update(id: number, input: UpdateUser): Promise<User> {
    const updatedUser = await userDatamapper.update(id, input);
    return updatedUser;
  },

  async delete(id: number): Promise<void> {
    return;
  },

  async login(input: LoginUser): Promise<void> {
    return;
  },

  async logout(id: number): Promise<void> {
    return;
  }
}