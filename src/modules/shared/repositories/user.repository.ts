import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, FindOptionsWhere, Repository, UpdateResult, FindOptionsRelations } from 'typeorm';
import { User } from '../entities/user.entity';
import { DatabaseExceptionService } from '../services/database-exception.service';

export class UserRepository {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	public async findOne(params: { where: FindOptionsWhere<User>; select: FindOptionsSelect<User>; relations?: FindOptionsRelations<User> }): Promise<User> {
		try {
			const { where, select, relations } = params;
			return await this.userRepository.findOne({ where, select, relations });
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async create(params: { data: Omit<User, 'id' | 'createdAt' | 'isBlocked'> }): Promise<User> {
		try {
			return await this.userRepository.save(params.data);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}

	public async update(params: { data: Partial<User>; where: FindOptionsWhere<User> }): Promise<UpdateResult> {
		try {
			const { where, data } = params;
			return await this.userRepository.update(where, data);
		} catch (err) {
			throw new DatabaseExceptionService(err.code, err.detail);
		}
	}
}
