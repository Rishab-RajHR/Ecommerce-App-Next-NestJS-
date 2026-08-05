import { Body, Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //  Register URL
    async register(@Body() regsiterDto: RegisterDto): Promise<AuthResponseDto> {
         return await this.authService.register(RegisterDto);
    }

    // Refresh access token
    @UseGuards(RefreshTokenGuard)

    async refresh() {}
}
