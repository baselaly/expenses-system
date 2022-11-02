import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import compression from '@fastify/compress';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/shared/services/index.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	app.setGlobalPrefix('api/v1');
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			forbidNonWhitelisted: true
		})
	);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.register(compression, { encodings: ['gzip', 'deflate'] });
	await app.listen(process.env.PORT || 3000);
}

bootstrap();
