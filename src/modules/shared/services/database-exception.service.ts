import { InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';

export class DatabaseExceptionService {
	constructor(code: string, message: string) {
		switch (code) {
			case '23505':
				return new UnprocessableEntityException({ message: 'TRY_TO_ENTER_DUPLICATE_ENTRY' });
			default:
				return new InternalServerErrorException({ message: message });
		}
	}
}
