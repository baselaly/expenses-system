import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Token, Expense } from './index';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false, length: 255, name: 'name' })
	name: string;

	@Column('varchar', { unique: true, nullable: false, length: 255, name: 'email' })
	email: string;

	@Column('varchar', { unique: true, nullable: false, length: 100, name: 'phone' })
	phone: string;

	@Column('varchar', { nullable: false, length: 100, name: 'password' })
	password: string;

	@Column('boolean', { default: false })
	isBlocked: boolean;

	@Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'createdAt' })
	createdAt: Date;

	@OneToMany(() => Token, (token) => token.user)
	tokens?: Token[];

	@OneToMany(() => Expense, (expense) => expense.user)
	expenses?: Expense[];
}
