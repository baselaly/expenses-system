import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, AuthModule],
	controllers: [],
	providers: []
})
export class AppModule {}
