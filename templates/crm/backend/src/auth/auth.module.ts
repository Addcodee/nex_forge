import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@user/user.service';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { options } from './config';

@Module({
    providers: [AuthService, ...STRATEGIES, ...GUARDS],
    controllers: [AuthController],
    imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
})
export class AuthModule {}
