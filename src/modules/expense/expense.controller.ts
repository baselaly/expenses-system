import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessClass } from '../shared/classes/success.class';
import { AuthenticatedUser } from '../shared/decorators/authenticated-user.decorator';
import { User } from '../shared/entities';
import { JwtAuthGuard } from '../shared/guards/index.guard';
import { MergeFileToRequestBodyInterceptor } from '../shared/interceptors/index.interceptor';
import { CreateExpenseDto, FindExpensesDto, UpdateExpenseDto } from './dtos/index.dto';
import { ExpenseService } from './expense.service';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@UseInterceptors(MergeFileToRequestBodyInterceptor)
	@Post()
	async create(@AuthenticatedUser() authenticatedUser: User, @Body() createExpenseDto: CreateExpenseDto): Promise<SuccessClass> {
		return new SuccessClass(await this.expenseService.create(createExpenseDto, authenticatedUser));
	}

	@UseInterceptors(MergeFileToRequestBodyInterceptor)
	@Put(':id')
	async upadte(@Param('id', new ParseUUIDPipe()) id: string, @AuthenticatedUser() authenticatedUser: User, @Body() updateExpenseDto: UpdateExpenseDto): Promise<SuccessClass> {
		return new SuccessClass(await this.expenseService.update(id, updateExpenseDto, authenticatedUser));
	}

	@Get(':id')
	async findOne(@AuthenticatedUser() authenticatedUser: User, @Param('id', new ParseUUIDPipe()) id: string): Promise<SuccessClass> {
		return new SuccessClass(await this.expenseService.findOne(authenticatedUser, id));
	}

	@Get()
	async findAll(@AuthenticatedUser() authenticatedUser: User, @Query() findExpensesDto: FindExpensesDto): Promise<SuccessClass> {
		return new SuccessClass(await this.expenseService.findAll(authenticatedUser, findExpensesDto));
	}

	@Delete(':id')
	async delete(@AuthenticatedUser() authenticatedUser: User, @Param('id', new ParseUUIDPipe()) id: string): Promise<SuccessClass> {
		await this.expenseService.delete(authenticatedUser, id);
		return new SuccessClass();
	}
}
