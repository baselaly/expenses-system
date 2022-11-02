import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, UserModule],
	controllers: [],
	providers: []
})
export class AppModule {}
