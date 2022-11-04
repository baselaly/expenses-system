import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, DeleteResult, UpdateResult } from 'typeorm';

export interface IFindOne<T> {
	findOne(params: { where: FindOptionsWhere<T>; select: FindOptionsSelect<T>; relations?: FindOptionsRelations<T> }): Promise<T>;
}

export interface IFindManyWithCount<T> {
	findManyWithCount(params: { where: FindOptionsWhere<T>; select: FindOptionsSelect<T>; relations?: FindOptionsRelations<T>; take: number; skip: number }): Promise<[Array<T>, number]>;
}

export interface ICreate<T> {
	create(params: { data: T }): Promise<T>;
}

export interface IDelete<T> {
	delete(params: { where: FindOptionsWhere<T> }): Promise<DeleteResult>;
}

export interface IUpdate<T> {
	update(params: { data: Partial<T>; where: FindOptionsWhere<T> }): Promise<UpdateResult>;
}
