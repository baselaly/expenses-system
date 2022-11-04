import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, AuthModule, ExpenseModule],
	controllers: [],
	providers: []
})
export class AppModule {}
