import { IsNotEmpty, IsObject, IsPositive, Max, MaxLength } from 'class-validator';
import { fileValidate } from 'src/modules/shared/decorators/index.decorator';

export class CreateExpenseDto {
	@IsNotEmpty({ message: 'TITLE_IS_REQUIRED' })
	@MaxLength(100, { message: 'TITLE_MUST_NOT_EXCEED_100_CHARS' })
	title: string;

	@IsNotEmpty({ message: 'AMOUNT_IS_REQUIRED' })
	@IsPositive({ message: 'AMOUNT_MUST_BE_POSITIVE' })
	@Max(999999999, { message: 'AMOUNT_MUST_NOT_EXCEED_999999999' })
	amount: number;

	@IsNotEmpty({ message: 'IMAGE_IS_REQUIRED' })
	@IsObject({ message: 'IMAGE_IS_INVALID' })
	@fileValidate(5, ['image/jpg', 'image/jpeg', 'image/png'], { message: 'IMAGE_MUST_BE_NOT_EXCEED_5MBS_AND_TYPE_JPG_PNG_JPEG' })
	receiptImage: Record<string, any>;
}
