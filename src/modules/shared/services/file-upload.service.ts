import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class FileUploadService {
	async uploadFile(folderPath: string, fileName: string, buffer: Buffer): Promise<void> {
		try {
			const path = `${process.env.UPLOAD_FOLDER}/${folderPath}`;
			await this.makeNestedDirectoriesIfNotExist(path);
			await fs.writeFile(`${path}/${fileName}`, buffer);
		} catch (err) {
			throw new InternalServerErrorException('SOMETHING_WENT_WRONG_IN_UPLOAD_FILE');
		}
	}

	static getFile(filePath: string): string {
		return `${process.env.STORAGE_URL}/${process.env.STORAGE_PATH}/${filePath}`;
	}

	private async makeNestedDirectoriesIfNotExist(path: string): Promise<void> {
		try {
			await fs.ensureDir(path);
		} catch (err) {
			throw new InternalServerErrorException('FOLDER_MISSING');
		}
	}

	async emptyDir(folderPath: string): Promise<void> {
		try {
			await fs.emptyDir(`${process.env.UPLOAD_FOLDER}/${folderPath}`);
		} catch (err) {
			throw new InternalServerErrorException('ERROR_IN_REMOVE_DIR');
		}
	}

	async deleteDir(folderPath: string): Promise<void> {
		try {
			await this.emptyDir(folderPath);
			await fs.rmdir(`${process.env.UPLOAD_FOLDER}/${folderPath}`);
		} catch (err) {
			throw new InternalServerErrorException('ERROR_IN_DELETE_DIR');
		}
	}

	getSingleExpenseFolderPath(expenseId: string): string {
		return `${process.env.EXPENSES_UPLOAD_FOLDER}/${expenseId}`;
	}
}
