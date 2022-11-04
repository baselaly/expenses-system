import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Token } from '../entities/index';
import { DatabaseExceptionService } from '../services/database-exception.service';

export class TokenRepository {
	constructor(@InjectRepository(Token) private tokenRepository: Repository<Token>) {}

	public async findOne(params: { where: FindOptionsWhere<Token>; select: FindOptionsSelect<Token>; relations?: FindOptionsRelations<Token> }): Promise<Token> {
		try {
			const { where, select, relations } = params;
			return await this.tokenRepository.findOne({ where, select, relations });
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async create(params: { data: Omit<Token, 'id' | 'createdAt' | 'isBlocked'> }): Promise<Token> {
		try {
			return await this.tokenRepository.save(params.data);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async update(params: { data: Partial<Token>; where: FindOptionsWhere<Token> }): Promise<UpdateResult> {
		try {
			const { where, data } = params;
			return await this.tokenRepository.update(where, data);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async delete(params: { where: FindOptionsWhere<Token> }): Promise<DeleteResult> {
		try {
			const { where } = params;
			return await this.tokenRepository.delete(where);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}
}
