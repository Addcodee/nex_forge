import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const urls = process.env.ALLOWED_URLS;

    if (urls) {
        const parsedUrls = JSON.parse(urls);

        app.enableCors({
            origin: parsedUrls,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });
    }

    const port = process.env.PORT ?? 3000;
    const host = '0.0.0.0';

    const env = process.env.NODE_ENV;

    app.setGlobalPrefix('/api/v1/');
    if (env === 'development') {
        await app.listen(port, host, () => {
            console.log(__dirname);

            console.log(`SERVER STARTED ON PORT ${port}`);
            console.log(`Access it locally: http://192.168.1.8:${port}`);
        });
    } else if (env === 'production') {
        await app.listen(port);
    } else {
        throw new Error('Environment is not defined');
    }
}
bootstrap();
