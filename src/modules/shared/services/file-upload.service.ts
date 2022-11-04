import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
	uploadFile(filePath: string, buffer: Buffer): void {
		fs.writeFileSync(`${process.env.UPLOAD_FOLDER}/${filePath}`, buffer);
	}

	getFile(filePath: string): string {
		return `${process.env.UPLOAD_FOLDER}/${filePath}`;
	}
}
