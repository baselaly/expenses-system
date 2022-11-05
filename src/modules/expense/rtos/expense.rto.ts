import { Expense } from 'src/modules/shared/entities';
import { HelperService, FileUploadService } from 'src/modules/shared/services/index.service';

export class ExpenseRto {
	id: string;
	title: string;
	amount: string;
	receiptImage: string;
	createdAt: Date;

	constructor(expense: Expense) {
		this.id = expense.id;
		this.title = expense.title;
		this.amount = HelperService.commaSeparatedFormat(expense.amount);
		this.receiptImage = FileUploadService.getFile(`${process.env.EXPENSES_UPLOAD_FOLDER}/${expense.id}/${expense.receiptImage}`);
		this.createdAt = expense.createdAt;
	}
}
