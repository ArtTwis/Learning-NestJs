import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {

}


// Validation Decorators Link : 
// https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators