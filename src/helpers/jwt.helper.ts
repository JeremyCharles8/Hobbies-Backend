import jwt from 'jsonwebtoken';

import { userDatamapper } from '../datamappers/index.datamapper.ts';
import { TokenInfo } from '../types/user.type.ts';

export default {
  /**
   * Create access token and refresh token using jwt
   * @param {TokenInfo} input - User's id and role
   * @returns {Promise<{ accessToken: string; refreshToken: string}>}
   */
  async createTokens(
    input: TokenInfo,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenExp = Math.round(Date.now() / 1000 + 60 * 15);
    const refreshTokenExp = Math.round(Date.now() / 1000 + 3600 * 24 * 30);
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

    if (!jwtPrivateKey) {
      throw new Error('Jwt private key is not provided');
    }

    const accessToken = jwt.sign({ exp: accessTokenExp, input }, jwtPrivateKey);

    const refreshToken = jwt.sign(
      { exp: refreshTokenExp, input },
      jwtPrivateKey,
    );

    await userDatamapper.update(input.id, { refreshToken });

    return { accessToken, refreshToken };
  },
};
