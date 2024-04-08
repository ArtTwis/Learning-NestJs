import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  avatar: string | undefined;

  @IsEnum(["Admin", "SuperAdmin", "User"], {
    message: 'valid role required!'
  })
  role: 'Admin' | 'SuperAdmin' | 'User';
}

// Validation Decorators Link :
// https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators
