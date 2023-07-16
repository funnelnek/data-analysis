import { PipeTransform, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

const validationOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false
}

export const DataTransferValidator: PipeTransform<any>[] = [
    new ValidationPipe(validationOptions)
];