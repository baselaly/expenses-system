import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, Number(process.env.SALT_ROUND));
	}

	async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}
