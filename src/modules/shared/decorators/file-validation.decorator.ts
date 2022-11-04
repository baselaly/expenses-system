import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function fileValidate(size: number, mimeTypes: string[], validationOptions?: ValidationOptions) {
	return function (object: Record<string, any>, propertyName: string) {
		registerDecorator({
			name: 'fileValidate',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const sizeValidate = value && value.size <= 1024 * 1024 * Number(size);
					const fileNameArray = value?.filename?.split('.');
					const typeValidate = value && (mimeTypes.includes(value.mimetype) || mimeTypes.includes(fileNameArray[fileNameArray.length - 1]));
					return sizeValidate && typeValidate;
				}
			}
		});
	};
}
