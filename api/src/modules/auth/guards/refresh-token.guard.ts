import { AuthService } from './../auth.service';
import { AuthController } from './../auth.controller';
//  Guard for protecting refresh token endpoints

import { Body, Controller, UseGuards } from "@nestjs/common";
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

  //   Register api
  async register(@Body() registerDto : RegisterDto) : Promise<AuthResponseDto> {
      return await this.authService.register(this.registerDto);
  }

  // Refresh access token
  @UseGuards(RefreshTokenGuard)
  async refresh(@GetUser('id') userId: string) : Promise<AuthResponseDto> {
     return await this.authService.refreshTokens(userId);
  }
}