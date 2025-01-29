import argon from '../helpers/argon.helper.ts';

import { userDatamapper } from '../datamappers/index.datamapper.ts';
import jwt from '../helpers/jwt.helper.ts';
import ApiError from '../errors/Api.error.ts';

import { LoginInput, LoginUser } from '../types/user.type.ts';

export default {
  /**
   * Check if user exists in database, verify password and calls jwt.helper to create tokens
   * @param {LoginInput} input - Contains login user's informations
   * @throws {ApiError} 401 - Incorrect email or password
   * @returns {Promise<{ accessToken: string; refreshToken:string }>}
   */
  async login(
    input: LoginInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await userDatamapper.findOne('email', input.email);
    if (!user) {
      throw new ApiError('Incorrect email or password', 401);
    }

    const pwValidation = await argon.compareFunc(user.password, input.password);
    if (!pwValidation) {
      throw new ApiError('Incorrect email or password', 401);
    }

    const { accessToken, refreshToken } = await jwt.createTokens({
      id: user.id,
      role: user.role,
    });

    return { accessToken, refreshToken };
  },

  /**
   * Verify that user exists in database et delete his refresh token
   * @param {number} id - user's id
   * @throws {ApiError} 404 - User not found
   * @returns {Promise<{void}>}
   */
  async logout(id: number): Promise<void> {
    const user = await userDatamapper.findByPk(id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    await userDatamapper.update(id, { refreshToken: null });

    return;
  },
};
