import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.findOne(createUserDto.email);
        if (user) throw new BadRequestException(`User with email: ${createUserDto.email} already exists`);

        const hashedPassword = hashSync(createUserDto.password, genSaltSync(10));
        return this.prismaService.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
            },
        });
    }

    async findOne(idOrEmail: string) {
        const user = await this.prismaService.user.findFirst({
            where: { OR: [{ id: idOrEmail }, { email: idOrEmail }] },
        });

        return user;
    }
}
