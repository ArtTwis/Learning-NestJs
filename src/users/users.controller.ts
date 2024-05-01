import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=Admin&age=25
  findAll(@Query('role') role?: 'Admin' | 'SuperAdmin' | 'User') {
    return this.usersService.findAll(role);
  }

  @Get('super') // GET /users/super
  findAllSuperUser() {
    return this.usersService.findAllSuperUser();
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  
  @Post() // POST /users
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id') // Patch /users/:id --Just to modify single property instead of modifing entire user object
  updateOne(
    @Param('id') id: string,
    @Body(ValidationPipe) updatedUser: UpdateUserDto,
  ) {
    return this.usersService.updateOne(+id, updatedUser);
  }

  @Delete(':id') // DELETE /users/:id
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(+id);
  }
}
