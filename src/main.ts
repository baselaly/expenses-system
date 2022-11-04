import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import fastifyMultipart from 'fastify-multipart';
import compression from '@fastify/compress';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/shared/filters/index.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const fastifyAdapter = new FastifyAdapter();
	fastifyAdapter.register(fastifyMultipart, { attachFieldsToBody: true });
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

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
