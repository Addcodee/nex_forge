import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { SignInDto } from './dto';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOne(dto.email);

        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Wrong email or password');
        }

        const access = this.signToken(user, 'access');
        const refresh = this.signToken(user, 'refresh');

        return { access, refresh };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_SECRET'),
            });

            const user = await this.userService.findOne(payload.userId);
            if (!user) throw new UnauthorizedException('User is not found');

            const newAccessToken = this.signToken(user, 'access');
            const newRefreshToken = this.signToken(user, 'refresh');

            return { access: newAccessToken, refresh: newRefreshToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token is invalid');
        }
    }

    private signToken(user: User, type: 'access' | 'refresh') {
        const accessPayload = { userId: user.id, email: user.email, roles: type };
        const refreshPayload = { userId: user.id, type };
        const expiresIn =
            type === 'access' ? this.configService.get('ACCESS_JWT_EXP') : this.configService.get('REFRESH_JWT_EXP');

        return this.jwtService.sign(type === 'access' ? accessPayload : refreshPayload, { expiresIn });
    }
}
