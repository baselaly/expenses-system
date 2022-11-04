import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('expenses')
export class Expense {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 100, nullable: false, name: 'title' })
	title: string;

	@Column('decimal', { nullable: false, name: 'amount', precision: 10, scale: 2 })
	amount: number;

	@Column('varchar', { nullable: false, length: 100, name: 'receiptImage' })
	receiptImage: string;

	@Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'createdAt' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.expenses)
	user: User;
}
