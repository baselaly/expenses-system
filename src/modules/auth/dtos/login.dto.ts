import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
	@IsNotEmpty({ message: 'EMAIL_IS_REQUIRED' })
	@IsEmail({}, { message: 'EMAIL_IS_NOT_VALID' })
	email: string;

	@IsNotEmpty({ message: 'PASSWORD_IS_REQUIRED' })
	password: string;
}
