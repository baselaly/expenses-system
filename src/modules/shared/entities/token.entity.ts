import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('token')
export class Token {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', { nullable: false, name: 'token' })
	token: string;

	@Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'createdAt' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.tokens)
	user: User;
}
