import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { SignInDto } from './dtos/signIn.dto';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

const MAX_AGE_REFRESH_TOKEN = 7 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signUp(signUpDto);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: MAX_AGE_REFRESH_TOKEN,
    });

    return {
      access_token: tokens.access_token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signIn(signInDto);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: MAX_AGE_REFRESH_TOKEN,
      path: '/',
    });

    return {
      access_token: tokens.access_token,
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id;

    const tokens = await this.authService.getTokens(userId);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: MAX_AGE_REFRESH_TOKEN,
    });

    return {
      access_token: tokens.access_token,
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/',
    });

    return {
      message: 'Logged out',
    };
  }
}
