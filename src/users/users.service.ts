import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
      role: 'Admin',
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Lindsay',
      last_name: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg',
      role: 'SuperAdmin',
    },
    {
      id: 9,
      email: 'tobias.funke@reqres.in',
      first_name: 'Tobias',
      last_name: 'Funke',
      avatar: 'https://reqres.in/img/faces/9-image.jpg',
      role: 'User',
    },
    {
      id: 10,
      email: 'byron.fields@reqres.in',
      first_name: 'Byron',
      last_name: 'Fields',
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
      role: 'SuperAdmin',
    },
    {
      id: 11,
      email: 'george.edwards@reqres.in',
      first_name: 'George',
      last_name: 'Edwards',
      avatar: 'https://reqres.in/img/faces/11-image.jpg',
      role: 'Admin',
    },
    {
      id: 12,
      email: 'rachel.howell@reqres.in',
      first_name: 'Rachel',
      last_name: 'Howell',
      avatar: 'https://reqres.in/img/faces/12-image.jpg',
      role: 'User',
    },
  ];

  findAll(role?: 'Admin' | 'SuperAdmin' | 'User') {
    if (role) {
      const usersArray = this.users.filter((user) => user.role === role);
      if(usersArray.length === 0) throw new NotFoundException(`Users with specific role: ${role}, Not found!`);
      return usersArray;
    }

    return this.users;
  }

  findAllSuperUser() {
    const superUsers = this.users.filter((user) => user.role === 'SuperAdmin');
    if (superUsers.length === 0) throw new NotFoundException('Super users not found!');
    return superUsers;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) return { ...user, ...updatedUser };
      return user;
    });

    return updatedUser;
  }

  deleteOne(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return id;
  }
}
