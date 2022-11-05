import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
	getPaginationData(page: number, perPage: number): { take: number; skip: number } {
		perPage = perPage || 10;
		const take = perPage;
		const skip = (page - 1) * perPage;
		return { take, skip };
	}

	getPageNumbers(count: number, perPage: number): number {
		return Math.floor((count + perPage - 1) / perPage);
	}

	generateFileName(filename: string, length = 5): string {
		const fileNameDottedArray = filename.split('.');
		const fileExt = fileNameDottedArray[fileNameDottedArray.length - 1];
		const newFileName: string = this.generateRandomString(length) + '.' + fileExt;
		return newFileName;
	}

	generateRandomString(length: number): string {
		const result = Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))
			.toString(36)
			.slice(1);
		return result;
	}

	static commaSeparatedFormat(value: number): string {
		return new Intl.NumberFormat().format(Math.ceil(value));
	}
}
