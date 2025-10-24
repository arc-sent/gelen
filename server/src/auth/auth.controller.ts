import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  auth(@Req() req: Request) {
    const token = req.cookies?.access_token;
    return this.authService.auth(token);
  }
}
