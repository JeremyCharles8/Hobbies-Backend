import { Request, Response } from 'express';

import authService from '../services/auth.service.ts';
import { LoginInput } from '../types/user.type.ts';

export default class Auth {
  /**
   * Get user's login informations, call login service, set cookie with tokens and return it
   * @param {Request<{}, {}, LoginInput>} req - Contain user's login informations
   * @param {Response} res
   * @returns {Promise<Response>} 200 status if login successfully
   */
  static async login(
    req: Request<{}, {}, LoginInput>,
    res: Response,
  ): Promise<Response> {
    console.log('Entrée conroleur');

    const input = req.body;
    const { accessToken, refreshToken } = await authService.login(input);
    const tokenPayload = JSON.stringify({ accessToken, refreshToken });

    res.cookie('authTokens', tokenPayload, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 30 * 86400000,
    });

    return res.status(200).json('Successfully logged');
  }
}
