import { Expense } from 'src/modules/shared/entities';
import { FindOptionsSelect } from 'typeorm';

export const selectExpense: FindOptionsSelect<Expense> = {
	id: true,
	amount: true,
	createdAt: true,
	title: true,
	receiptImage: true
};
