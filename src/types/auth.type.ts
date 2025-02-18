import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface CustomPayload extends JwtPayload {
  input: {
    id: number;
    role?: string;
  };
}

export interface AuthRequest extends Request {
  user: {
    id: number;
    role?: string;
  };
}
