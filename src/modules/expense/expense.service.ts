import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense, User } from '../shared/entities';
import { ExpenseRepository } from '../shared/repositories/index.repository';
import { FileUploadService, HelperService } from '../shared/services/index.service';
import { CreateExpenseDto, FindExpensesDto, UpdateExpenseDto } from './dtos/index.dto';
import { ExpenseRto } from './rtos/index.rto';
import { selectExpense } from './selectQueries/index.select';

@Injectable()
export class ExpenseService {
	constructor(private readonly expenseRepository: ExpenseRepository, private readonly fileUploadService: FileUploadService, private readonly helperService: HelperService) {}

	async create(createExpenseDto: CreateExpenseDto, user: User): Promise<{ id: string }> {
		const fileName = this.helperService.generateFileName(createExpenseDto.receiptImage.filename, 7);

		const data = { amount: createExpenseDto.amount, title: createExpenseDto.title, receiptImage: fileName, user };
		const expense = await this.expenseRepository.create({ data });

		const expenseFolderPath = this.fileUploadService.getSingleExpenseFolderPath(expense.id);

		await this.fileUploadService.uploadFile(expenseFolderPath, fileName, createExpenseDto.receiptImage?.buffer);

		return { id: expense.id };
	}

	async update(id: string, updateExpenseDto: UpdateExpenseDto, user: User): Promise<{ id: string }> {
		const data: Partial<Expense> = { amount: updateExpenseDto.amount, title: updateExpenseDto.title };

		const expense = await this.expenseRepository.findOne({ where: { id, user }, select: { id: true } });

		if (!expense) {
			throw new NotFoundException('RESOURCE_NOT_FOUND');
		}

		if (updateExpenseDto.receiptImage) {
			const fileName = this.helperService.generateFileName(updateExpenseDto.receiptImage.filename, 7);

			const expenseFolderPath = this.fileUploadService.getSingleExpenseFolderPath(expense.id);

			// delete old image
			await this.fileUploadService.emptyDir(expenseFolderPath);
			// upload new image
			await this.fileUploadService.uploadFile(expenseFolderPath, fileName, updateExpenseDto.receiptImage.buffer);

			data.receiptImage = fileName;
		}

		await this.expenseRepository.update({ where: { id }, data });

		return { ...expense };
	}

	async findOne(user: User, id: string): Promise<ExpenseRto> {
		const expense = await this.expenseRepository.findOne({ where: { id, user }, select: selectExpense });

		if (!expense) {
			throw new NotFoundException('RESOURCE_NOT_FOUND');
		}

		return new ExpenseRto(expense);
	}

	async findAll(user: User, findExpensesDto: FindExpensesDto): Promise<{ expenses: Array<ExpenseRto>; pages: number }> {
		const { take, skip } = this.helperService.getPaginationData(findExpensesDto.page, findExpensesDto.perPage);
		const [data, count] = await this.expenseRepository.findManyWithCount({ select: selectExpense, where: { user }, take, skip });
		const pages = this.helperService.getPageNumbers(count, findExpensesDto.perPage);
		const expenses = data.map((expense: Expense) => new ExpenseRto(expense));

		return { expenses, pages };
	}

	async delete(user: User, id: string): Promise<void> {
		const expense = await this.expenseRepository.findOne({ where: { id, user }, select: { id: true } });

		if (!expense) {
			throw new NotFoundException('RESOURCE_NOT_FOUND');
		}

		await this.expenseRepository.delete({ where: { user, id } });

		const expenseFolderPath = this.fileUploadService.getSingleExpenseFolderPath(expense.id);
		await this.fileUploadService.deleteDir(expenseFolderPath);
	}
}
