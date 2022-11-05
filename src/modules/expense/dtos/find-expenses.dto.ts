import { IsNotEmpty, IsPositive } from 'class-validator';

export class FindExpensesDto {
	@IsNotEmpty({ message: 'PAGE_IS_REQUIRED' })
	@IsPositive({ message: 'PAGE_IS_INVALID' })
	page: number;

	@IsNotEmpty({ message: 'PER_PAGE_IS_REQUIRED' })
	@IsPositive({ message: 'PER_PAGE_IS_INVALID' })
	perPage: number;
}
