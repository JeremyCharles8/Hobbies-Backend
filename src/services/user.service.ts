import { userDatamapper } from '../datamappers/index.datamapper.ts';
import ApiError from '../errors/Api.error.ts';
import argon from '../helpers/argon.helper.ts';

import { LoginUser, CreateUser, User, UpdateUser } from '../types/user.type.ts';

export default {
  // async getAll(): Promise<User[]> {
  //   //TODO Check if request come from an admin
  //   const users = await userDatamapper.findAll();
  //   return users;
  // },
  //TODO Fix Promise's type issue
  // async getOne(id: number): Promise<User | PublicUser | AdminUser | null> {
  //   //TODO Check if request come from an admin or another user
  //   const user = await userDatamapper.findByPk(id);
  //   return user;
  // },

  /**
   * Call datamapper to get one user's informations
   * @param {number} id - User's id
   * @throws {ApiError} 404 - User not found
   * @returns {Promise<User>} user's informations
   */
  async getOne(id: number): Promise<User> {
    const user = await userDatamapper.findByPk(id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    return user;
  },

  /**
   * Check if email or nickname already exist in database and call datamapper to create a new user
   * @param {CreateUser} input - Contains mandatory informations to create user
   * @throws {ApiError} 409 - Email already exists
   * @throws {ApiError} 409 - Nickname already exists
   * @returns {Promise<void>}
   */
  async create(input: CreateUser): Promise<void> {
    const { nickname, email, password } = input;

    const emailAlreadyExists: LoginUser | null = await userDatamapper.findOne(
      'email',
      email,
    );
    if (emailAlreadyExists) {
      throw new ApiError('Email already exists', 409);
    }

    const nicknameAlreadyExists: boolean = await userDatamapper.findOne(
      'nickname',
      nickname,
    );
    if (nicknameAlreadyExists) {
      throw new ApiError('Nickname already exists', 409);
    }

    const hashedPassword: string = await argon.hashFunc(password);
    await userDatamapper.create({
      nickname,
      email,
      password: hashedPassword,
    });

    return;
  },

  /**
   * Check if user exists and call datamapper to update user's informations
   * @param {number} id User to update
   * @param {UpdateUser} input Information(s) to update
   * @throws {ApiError} 404 - User not found
   * @throws {ApiError} 409 - Email already exists
   * @throws {ApiError} 409 - Nickname already exists
   * @returns {Promise<User>} User with updated information(s)
   */
  async update(id: number, input: UpdateUser): Promise<User> {
    const user = await userDatamapper.findByPk(id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    if (input.email) {
      const emailAlreadyExists = await userDatamapper.findOne(
        'email',
        input.email,
      );
      if (emailAlreadyExists) {
        throw new ApiError('Email already exists', 409);
      }
    }

    if (input.nickname) {
      const nicknameAlreadyExists = await userDatamapper.findOne(
        'nickname',
        input.nickname,
      );
      if (nicknameAlreadyExists) {
        throw new ApiError('Nickname already exists', 409);
      }
    }

    const updatedUser = await userDatamapper.update(id, input);

    return updatedUser;
  },

  /**
   * Call datamapper to delete user and check if user has been deleted
   * @param {number} id - User's id
   * @throws {ApiError} 404 - User not found
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    const deletedUser = await userDatamapper.delete(id);
    if (!deletedUser) {
      throw new ApiError('User not found', 404);
    }

    return;
  },
};
