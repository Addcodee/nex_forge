import { BadRequestException, Body, Controller, Get, Post, Res, UnauthorizedException } from '@nestjs/common';
import { Public } from '@shared/decorators';
import { SignInDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async signIn(@Body() dto: SignInDto, @Res() res: Response) {
        const user = await this.authService.signIn(dto);

        if (!user) {
            throw new BadRequestException('Authentication failed');
        }

        return res.json({ access: user.access, refresh: user.refresh });
    }

    @Public()
    @Post('register')
    async register(@Body() dto: RegisterDto, @Res() res: Response) {
        const user = await this.authService.register(dto);

        if (!user) {
            throw new BadRequestException('Authorization failed');
        }

        return res.json({ access: user.access, refresh: user.refresh });
    }

    @Public()
    @Post('refresh')
    async refreshToken(@Body('refresh') refresh: string, @Res() res: Response) {
        if (!refresh) {
            throw new UnauthorizedException('Token is not defined');
        }

        const user = await this.authService.refreshTokens(refresh);

        return res.json({ accessToken: user.access, refresh: user.refresh });
    }
}
