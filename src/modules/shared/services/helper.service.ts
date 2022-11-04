import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
	getPaginationData(page: number, perPage: number): { take: number; skip: number } {
		perPage = perPage || 10;
		const take = perPage;
		const skip = (page - 1) * perPage;
		return { take, skip };
	}
}
