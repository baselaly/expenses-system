import { Global, Module } from '@nestjs/common';
import { JwtAuthService, PasswordService, HelperService, FileUploadService } from './services/index.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, TokenRepository } from './repositories/index.repository';
import { User } from './entities/user.entity';
import { Token } from './entities';

@Global()
@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.SECRET_KEY,
				signOptions: { expiresIn: process.env.TOKEN_EXPIREDIN }
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'postgres',
				host: process.env.DATABASE_HOST,
				port: Number(process.env.DATABASE_PORT),
				username: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forFeature([User, Token])
	],
	exports: [JwtAuthService, PasswordService, FileUploadService, HelperService, UserRepository, TokenRepository],
	providers: [JwtAuthService, PasswordService, FileUploadService, HelperService, UserRepository, TokenRepository]
})
export class SharedModule {}
