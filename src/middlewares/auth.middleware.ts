import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ApiError from '../errors/Api.error.ts';

import { AuthRequest, CustomPayload } from '../types/auth.type.ts';

//Verify access token and next if it's valid, or redirect to /refreshToken if it's expired
export default () =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      const accessToken: string = req.cookies.authTokens.split('"')[3];
      if (!accessToken) {
        throw new ApiError('Unauthorized, token is missing', 401);
      }

      const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
      if (!jwtPrivateKey) {
        throw new ApiError('Jwt private key is not provided');
      }

      const tokenInfo = jwt.verify(accessToken, jwtPrivateKey) as CustomPayload;
      req.user = { id: tokenInfo.input.id, role: tokenInfo.input.role };

      return next();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          return res.redirect(307, '/api/auth/refreshToken');
        }

        return next(error);
      }
    }
  };
