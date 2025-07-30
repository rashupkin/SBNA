import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/signUp.dto';
import { SignInDto } from './dtos/signIn.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../../prisma/client';
import { EDbErrors } from '../constants/EDbErrors';

const ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      signUpDto.password = await hash(signUpDto.password, ROUNDS);

      const user = await prisma.user.create({
        data: signUpDto,
      });

      return await this.getTokens(user.id);
    } catch (err) {
      if (err.code === EDbErrors.UNIQUENESS_CONSTAINT) {
        if (err.meta.target === 'users_username_key') {
          throw new HttpException(
            'This username already exists',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (err.meta.target === 'users_email_key') {
          throw new HttpException(
            'This email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw err;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          username: signInDto.username,
        },
      });

      if (!(await compare(signInDto.password, user.password))) {
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      }

      return await this.getTokens(user.id);
    } catch (err) {
      if (err.code === EDbErrors.NOT_FOUND) {
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      }

      throw err;
    }
  }

  async getTokens(id: number) {
    const payload = { id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_TOKEN,
        expiresIn: process.env.EXPIRESIN_ACCESS_TOKEN,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_TOKEN,
        expiresIn: process.env.EXPIRESIN_REFRESH_TOKEN,
      }),
    };
  }
}
