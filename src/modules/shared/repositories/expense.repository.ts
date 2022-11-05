import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Expense } from '../entities/index';
import { ICreate, IDelete, IFindOne, IUpdate, IFindManyWithCount } from '../interfaces/index.interface';
import { DatabaseExceptionService } from '../services/database-exception.service';

export class ExpenseRepository implements ICreate<Expense>, IUpdate<Expense>, IDelete<Expense>, IFindOne<Expense>, IFindManyWithCount<Expense> {
	constructor(@InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>) {}

	public async findOne(params: { where: FindOptionsWhere<Expense>; select: FindOptionsSelect<Expense>; relations?: FindOptionsRelations<Expense> }): Promise<Expense> {
		try {
			const { where, select, relations } = params;
			return await this.expenseRepository.findOne({ where, select, relations });
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async findManyWithCount(params: { where: FindOptionsWhere<Expense>; select: FindOptionsSelect<Expense>; relations?: FindOptionsRelations<Expense>; take: number; skip: number }): Promise<[Array<Expense>, number]> {
		try {
			const { where, select, relations, skip, take } = params;
			return await this.expenseRepository.findAndCount({ where, select, relations, skip, take });
		} catch (err) {
			console.log(err);
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async create(params: { data: Omit<Expense, 'id' | 'createdAt'> }): Promise<Expense> {
		try {
			return await this.expenseRepository.save(params.data);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async update(params: { data: Partial<Expense>; where: FindOptionsWhere<Expense> }): Promise<UpdateResult> {
		try {
			const { where, data } = params;
			return await this.expenseRepository.update(where, data);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async delete(params: { where: FindOptionsWhere<Expense> }): Promise<DeleteResult> {
		try {
			const { where } = params;
			return await this.expenseRepository.delete(where);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}
}
