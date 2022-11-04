import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from '../classes/error.class';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const errMessage: string | object = exception instanceof HttpException ? exception.getResponse() : { message: 'UNKNOWN_ERROR' };
		const errorType: string = errMessage['error'];
		const errors = [];
		if (Array.isArray(errMessage['message'])) {
			for (const row of errMessage['message']) {
				errors.push(row);
			}
		} else {
			errors.push(errMessage['message'] ?? errMessage);
		}

		response.status(status).send(new CustomError(status, errors, errorType, request.url));
	}
}
