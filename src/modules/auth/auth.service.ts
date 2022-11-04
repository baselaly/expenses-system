import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenRepository, UserRepository } from '../shared/repositories/index.repository';
import { JwtAuthService, PasswordService } from '../shared/services/index.service';
import { LoginDto, RegisterDto } from './dtos/index.dto';
import { UserAuthData } from './types/index.type';

@Injectable()
export class AuthService {
	constructor(private readonly userRepository: UserRepository, private readonly tokenRepository: TokenRepository, private readonly jwtAuthService: JwtAuthService, private readonly passwordService: PasswordService) {}

	async register(registerDto: RegisterDto): Promise<UserAuthData> {
		const password = await this.passwordService.hashPassword(registerDto.password);

		const data = {
			name: registerDto.name,
			email: registerDto.email,
			password,
			phone: registerDto.phone
		};

		const user = await this.userRepository.create({ data });

		const token = await this.jwtAuthService.generateToken({ id: user.id, email: user.email, phone: user.phone, name: user.name });

		await this.tokenRepository.create({ data: { token, user } });

		return { token };
	}

	async login(loginDto: LoginDto): Promise<UserAuthData> {
		const user = await this.userRepository.findOne({ where: { email: loginDto.email }, select: { id: true, name: true, password: true, phone: true, email: true, isBlocked: true } });

		if (!user || (await this.passwordService.comparePassword(loginDto.password, user.password)) === false || user.isBlocked) {
			throw new UnauthorizedException('WRONG_CREDENTIALS');
		}

		const token = await this.jwtAuthService.generateToken({ id: user.id, email: user.email, phone: user.phone, name: user.name });

		await Promise.all([this.tokenRepository.delete({ where: { user } }), this.tokenRepository.create({ data: { token, user } })]);

		return { token };
	}
}
