import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
	@IsNotEmpty({ message: 'EMAIL_IS_REQUIRED' })
	@IsEmail({}, { message: 'EMAIL_IS_NOT_VALID' })
	email: string;

	@IsNotEmpty({ message: 'PASSWORD_IS_REQUIRED' })
	@MinLength(8, { message: 'PASSWORD_MUST_EXCEED_8_CHARS' })
	@MaxLength(15, { message: 'PASSWORD_MUST_NOT_EXCEED_15_CHARS' })
	password: string;

	@IsNotEmpty({ message: 'PHONE_IS_REQUIRED' })
	@Matches(RegExp('^01[0-9]{9}$'), { message: 'PHONE_IN_INVALID' })
	phone: string;

	@IsNotEmpty({ message: 'NAME_IS_REQUIRED' })
	@MaxLength(50, { message: 'NAME_MUST_NOT_EXCEED_50_CHARS' })
	name: string;
}
