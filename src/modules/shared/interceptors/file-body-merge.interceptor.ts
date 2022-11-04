import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MergeFileToRequestBodyInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<CallHandler> {
		const request = context.switchToHttp().getRequest();
		const requestBody: Body = request.body;
		for (const property in requestBody) {
			if (Array.isArray(requestBody[property])) {
				// handle array fields
				const newArray = [];
				requestBody[property].forEach((item) => {
					if (item.file) {
						// if its array of files
						newArray.push({
							file: item.file,
							buffer: item._buf,
							filename: item.filename,
							mimetype: item.mimetype,
							encoding: item.encoding,
							size: item._buf.length
						});
					} else {
						// if its not files array
						newArray.push(item.value);
					}
				});
				request.body[property] = newArray;
			} else if (requestBody[property].file) {
				// if its single file field
				request.body[property] = {
					file: requestBody[property].file,
					buffer: requestBody[property]._buf,
					size: requestBody[property]._buf.length, // get file size
					filename: requestBody[property].filename,
					mimetype: requestBody[property].mimetype,
					encoding: requestBody[property].encoding
				};
			} else {
				// if its normal field
				request.body[property] = requestBody[property]['value'];
			}
		}
		return next.handle();
	}
}
