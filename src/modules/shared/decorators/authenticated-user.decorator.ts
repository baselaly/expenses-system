import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator((data: string, ctx: ExecutionContext): any => {
	const userData = ctx.switchToHttp().getRequest().userData;
	return data && userData ? userData[data] : userData;
});
