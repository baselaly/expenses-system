import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities';

export const AuthenticatedUser = createParamDecorator((data: string, ctx: ExecutionContext): Partial<User> => {
	return ctx.switchToHttp().getRequest().userData;
});
