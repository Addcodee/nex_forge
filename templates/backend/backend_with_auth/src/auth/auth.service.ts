import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { SignInDto } from './dto';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { emailRegex, passwordRegex } from './regex/regex';

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

    async register(dto: RegisterDto) {
        const isUserExist = await this.userService.findOne(dto.email);

        if (isUserExist) {
            throw new BadRequestException(`User with email: ${dto.email} already exists`);
        }

        if (!emailRegex.test(dto.email)) {
            throw new BadRequestException(`Invalid email`);
        }

        if (dto.password.length < 8) {
            throw new BadRequestException('Password must include at least 8 symbols');
        }

        if (!passwordRegex.test(dto.password)) {
            throw new BadRequestException(
                'Password must include at least one special character, one uppercase letter, one lowercase letter, and one digit.',
            );
        }

        if (dto.password !== dto.confirm_password) {
            throw new BadRequestException(`Passwords don't match`);
        }

        const newUser = await this.userService.create({ email: dto.email, password: dto.password });

        const access = this.signToken(newUser, 'access');
        const refresh = this.signToken(newUser, 'refresh');

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
