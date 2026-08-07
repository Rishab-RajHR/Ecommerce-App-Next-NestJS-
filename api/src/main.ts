import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Project description
   app.setGlobalPrefix('api/v1');

   //  Set Global Validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // Enable CORS
    app.enableCors({
         origin: process.env.ALLOWED_ORIGINS?.split(',') ?? 'http://localhost:3002',
         credentials: true,
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
         allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    // Enable Swagger DOcs
    const config = new DocumentBuilder();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
        customSiteTitle: 'API Documentation',
        customfavIcon: 'https://nestjs.com/img/logo-small.svg',
        customCss: `
          .swagger-ui .topbar {display: none}
          .swagger-ui .info { margin: 50px 0; }
          .swagger-ui .info .title {color: #4A90E2;}
        `
    });
   

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch(
    (error) => {
        Logger.error('Error starting server', error);
        process.exit();
    }
);
