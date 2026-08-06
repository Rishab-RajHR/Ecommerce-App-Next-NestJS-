import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //  Register api
    @Post('register')
    async register(@Body() regsiterDto: RegisterDto): Promise<AuthResponseDto> {
         return await this.authService.register(RegisterDto);
    }

    // Refresh access token
    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    async refresh(@GetUser('id') userId: string): Promise<AuthResponseDto> {
         return await this.authService.refreshToken(userId);
    }

    // Logout user and invalidate refresh token
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@GetUser('id') userId: string): Promise<{ message : string }> {
        await this.authService.logout(userId);
        return { message: 'Successfully logged out'}
    }

    // Login
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
          
    }
}
