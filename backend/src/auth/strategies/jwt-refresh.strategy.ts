import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

function extractRefreshTokenFromCookie(req: Request): string | null {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const match = cookies.match(/refresh_token=([^;]+)/);
  return match ? match[1] : null;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: extractRefreshTokenFromCookie,
      secretOrKey: process.env.JWT_REFRESH_TOKEN || '',
      passReqToCallback: false,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
