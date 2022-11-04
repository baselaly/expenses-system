import { Body, Controller, Post } from '@nestjs/common';
import { SuccessClass } from '../shared/classes/success.class';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/index.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() registerDto: RegisterDto): Promise<SuccessClass> {
		return new SuccessClass(await this.authService.register(registerDto));
	}

	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<SuccessClass> {
		return new SuccessClass(await this.authService.login(loginDto));
	}
}
