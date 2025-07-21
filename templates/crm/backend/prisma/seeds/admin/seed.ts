import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function adminSeed() {
    const adminEmail = process.env.ADMIN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin && adminPassword) {
        const hashedPassword = bcrypt.hashSync(adminPassword, 10);

        await prisma.user.create({
            data: {
                email: adminEmail!,
                password: hashedPassword,
            },
        });

        console.log(`Admin is created: ${adminEmail}`);
    } else {
        console.log('Admin already exists');
    }
}
