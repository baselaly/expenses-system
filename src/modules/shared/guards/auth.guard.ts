import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenRepository } from '../repositories/index.repository';
import { JwtAuthService } from '../services/jwt-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private reflector: Reflector, private readonly jwtAuthService: JwtAuthService, private readonly tokenRepository: TokenRepository) {}

	async canActivate(context: ExecutionContext): Promise<any> {
		let token: string = context.switchToHttp().getRequest().headers['authorization'];
		const request = context.switchToHttp().getRequest();
		if (token && token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
			try {
				const result = await this.jwtAuthService.verifyToken(token);

				const userToken = await this.tokenRepository.findOne({
					where: { token },
					select: {
						id: true,
						token: true
					},
					relations: { user: true }
				});

				if (!userToken || !userToken.user) {
					throw new UnauthorizedException();
				}

				if (userToken.user.isBlocked) {
					await this.tokenRepository.delete({ where: { user: userToken.user } });
					throw new UnauthorizedException();
				}

				request.userData = result;
				return request;
			} catch (err) {
				throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
			}
		} else {
			throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
		}
	}
}
