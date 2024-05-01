import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'First_Name of the user',
    example: 'John'
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last_Name of the user',
    example: 'Doe'
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Avatar url link',
    example: 'https://reqres.in/img/faces/7-image.jpg'
  })
  avatar: string | undefined;

  @ApiProperty({
    description: 'Role of the user',
    example: 'Admin | SuperAdmin | User'
  })
  @IsEnum(["Admin", "SuperAdmin", "User"], {
    message: 'valid role required!'
  })
  role: 'Admin' | 'SuperAdmin' | 'User';
}

export class CreateUserResponseDto extends CreateUserDto {
  @ApiProperty({
    description: 'Unique User Id',
    example: 1
  })
  id: number;
}

// Validation Decorators Link :
// https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators
